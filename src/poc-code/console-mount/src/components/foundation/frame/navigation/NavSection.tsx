import * as React from 'react';
import { NavExpandable, NavGroup } from '@patternfly/react-core';
import some from 'lodash/some';
import find from 'lodash/find';
import castArray from 'lodash/castArray';
import { connect } from 'react-redux';
import { Perspective, isPerspective, NavItem, isNavItem, withActivePerspective } from '@console/dynamic-plugin-sdk';
import { LoadedExtension } from '@console/dynamic-plugin-sdk/src/types';
import { withExtensions } from '@console/plugin-sdk';
import { RootState } from '../../../../redux';
import { FLAGS } from '../../../../redux/reducers/flags';
// eslint-disable-next-line import/no-cycle
import { stripNS, createLink } from './items';
import { sortExtensionItems } from './navSortUtils';

const flagPending = (flag: boolean) => flag === undefined;
const basePathPattern = new RegExp(`^/?${window.SERVER_FLAGS.basePath}`);
const stripBasePath = (path: string): string => path.replace(basePathPattern, '/');

const navSectionStateToProps = (state: RootState, { required }: NavSectionProps): NavSectionStateProps => {
  const flags = state.FLAGS;
  const canRender = required ? flags[required] : true;

  return {
    flags,
    canRender,
    activeNamespace: null,
    location: null,
  };
};

const findChildIndex = (id: string, Children: React.ReactElement[]) => Children.findIndex((c) => c.props.id === id);

const mergePluginChild = (
  Children: React.ReactElement[],
  pluginChild: React.ReactElement,
  insertBefore?: string | string[],
  insertAfter?: string | string[],
) => {
  let index = -1;
  const before = Array.isArray(insertBefore) ? insertBefore : [insertBefore];
  const after = Array.isArray(insertAfter) ? insertAfter : [insertAfter];
  let count = 0;
  while (count < before.length && index < 0) {
    index = findChildIndex(before[count++], Children);
  }
  count = 0;
  while (count < after.length && index < 0) {
    index = findChildIndex(after[count++], Children);
    if (index >= 0) {
      index += 1;
    }
  }

  if (index >= 0) {
    Children.splice(index, 0, pluginChild);
  } else {
    Children.push(pluginChild);
  }
};

class NavSectionInternal extends React.Component<Props, NavSectionState> {
  public state: NavSectionState;

  constructor(props) {
    super(props);
    this.state = { isOpen: false, activeChild: null };

    const activeChild = this.getActiveChild();
    if (activeChild) {
      this.state.activeChild = activeChild;
      this.state.isOpen = true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isOpen } = this.state;

    if (isOpen !== nextProps.isOpen) {
      return true;
    }

    if (!isOpen && !nextState.isOpen) {
      return false;
    }

    return nextProps.location !== this.props.location || nextProps.flags !== this.props.flags;
  }

  getActiveChild() {
    const { activeNamespace, location } = this.props;
    const children = this.getChildren();

    if (!children) {
      return stripBasePath(location).startsWith(this.props.activePath);
    }

    const resourcePath = location ? stripNS(location) : '';

    // current bug? - we should be checking if children is a single item or .filter is undefined
    return (children as any[])
      .filter((c) => {
        if (!c) {
          return false;
        }
        if (c.props.startsWith) {
          const active = c.type.startsWith(resourcePath, c.props.startsWith);
          if (active || !c.props.activePath) {
            return active;
          }
        }
        return c.type.isActive && c.type.isActive(c.props, resourcePath, activeNamespace);
      })
      .map((c) => `${c.props.id}-${c.props.name}`)[0];
  }

  componentDidUpdate(prevProps, prevState) {
    const activeChild = this.getActiveChild();

    if (prevState.activeChild !== activeChild) {
      const state: Partial<NavSectionState> = { activeChild };
      if (activeChild && !prevState.activeChild) {
        state.isOpen = true;
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(state as NavSectionState);
    }
  }

  toggle = (e, expandState) => {
    this.setState({ isOpen: expandState });
  };

  getNavItemExtensions = (perspective: string, title: string, id: string) => {
    const { navItemExtensions, perspectiveExtensions } = this.props;

    const defaultPerspective = find(perspectiveExtensions, (p) => p.properties.default);
    const isDefaultPerspective = defaultPerspective && perspective === defaultPerspective.properties.id;

    return navItemExtensions.filter(
      (item) =>
        // check if the item is contributed to the current perspective,
        // or if no perspective specified, are we in the default perspective
        (item.properties.perspective === perspective || (!item.properties.perspective && isDefaultPerspective)) && item.properties.section === id,
    );
  };

  mapChild = (c: React.ReactElement) => {
    if (!c) {
      return null;
    }

    const { activeChild } = this.state;
    const { flags, activeNamespace } = this.props;
    const { name, required, disallowed, id } = c.props;

    const requiredArray = required ? castArray(required) : [];
    const requirementMissing = some(requiredArray, (flag) => flag && (flagPending(flags[flag]) || !flags[flag]));
    if (requirementMissing) {
      return null;
    }
    if (disallowed && (flagPending(flags[disallowed]) || flags[disallowed])) {
      return null;
    }

    return React.cloneElement(c, {
      key: name,
      isActive: `${id}-${name}` === activeChild,
      activeNamespace,
      flags,
    });
  };

  getChildren() {
    const { id, title, children, activePerspective: perspective } = this.props;
    const Children = React.Children.map(children, this.mapChild) || [];
    const childItems = sortExtensionItems(this.getNavItemExtensions(perspective, title, id));

    childItems.forEach((item) => {
      const pluginChild = this.mapChild(createLink(item));
      if (pluginChild) {
        mergePluginChild(Children, pluginChild, item.properties.insertBefore, item.properties.insertAfter);
      }
    });

    return Children;
  }

  render() {
    if (!this.props.canRender) {
      return null;
    }

    const { title, isGrouped, 'data-quickstart-id': dataQuickStartId } = this.props;
    const { isOpen, activeChild } = this.state;
    const isActive = !!activeChild;
    const children = this.getChildren();

    if (!children.length) {
      return null;
    }

    if (isGrouped) {
      return (
        <NavGroup title="" data-quickstart-id={dataQuickStartId}>
          {children}
        </NavGroup>
      );
    }

    return (
      <NavExpandable
        title={title}
        isActive={isActive}
        isExpanded={isOpen}
        onExpand={this.toggle}
        data-test="nav"
        buttonProps={{ 'data-quickstart-id': dataQuickStartId }}
      >
        {children}
      </NavExpandable>
    );
  }
}

const NavSection = connect(navSectionStateToProps)(
  withExtensions<NavSectionExtensionProps>({
    navItemExtensions: isNavItem,
    perspectiveExtensions: isPerspective,
  })(withActivePerspective(NavSectionInternal)),
);

export type NavSectionTitle =
  | 'Administration'
  | 'Builds'
  | 'Compute'
  | 'Home'
  | 'Observe'
  | 'Networking'
  | 'Operators'
  | 'Service Catalog'
  | 'Storage'
  | 'Workloads';

type NavSectionStateProps = {
  flags?: FLAGS;
  canRender?: boolean;
  activeNamespace?: string;
  activePath?: string;
  location?: string;
};

type NavSectionExtensionProps = {
  navItemExtensions: LoadedExtension<NavItem>[];
  perspectiveExtensions: Perspective[];
};

type NavSectionProps = {
  id: string;
  title: NavSectionTitle | string;
  isGrouped?: boolean;
  required?: string;
  activePerspective?: string;
  'data-quickstart-id'?: string;
};

type Props = NavSectionProps & NavSectionStateProps & NavSectionExtensionProps;

type NavSectionState = {
  isOpen: boolean;
  activeChild: React.ReactNode;
};

export default NavSection;
