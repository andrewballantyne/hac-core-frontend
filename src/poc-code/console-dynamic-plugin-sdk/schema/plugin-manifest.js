export default {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "extensions": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/SupportedExtension"
      },
      "description": "List of extensions contributed by the plugin."
    },
    "name": {
      "type": "string",
      "description": "Plugin name. Should be the same as `metadata.name` of the corresponding `ConsolePlugin` resource used to represent the plugin on the cluster."
    },
    "version": {
      "type": "string",
      "description": "Plugin version. Must be semver compliant."
    },
    "displayName": {
      "type": "string",
      "description": "User-friendly plugin name."
    },
    "description": {
      "type": "string",
      "description": "User-friendly plugin description."
    },
    "dependencies": {
      "type": "object",
      "properties": {
        "@console/pluginAPI": {
          "type": "string"
        }
      },
      "required": [
        "@console/pluginAPI"
      ],
      "additionalProperties": {
        "type": "string"
      },
      "description": "Plugin API and other plugins required for this plugin to work."
    }
  },
  "required": [
    "dependencies",
    "extensions",
    "name",
    "version"
  ],
  "description": "Schema of Console plugin's `plugin-manifest.json` file.",
  "definitions": {
    "SupportedExtension": {
      "anyOf": [
        {
          "$ref": "#/definitions/FeatureFlag"
        },
        {
          "$ref": "#/definitions/ModelFeatureFlag"
        },
        {
          "$ref": "#/definitions/ReduxReducer"
        },
        {
          "$ref": "#/definitions/ContextProvider"
        },
        {
          "$ref": "#/definitions/StandaloneRoutePage"
        },
        {
          "$ref": "#/definitions/PVCCreateProp"
        },
        {
          "$ref": "#/definitions/PVCStatus"
        },
        {
          "$ref": "#/definitions/PVCAlert"
        },
        {
          "$ref": "#/definitions/PVCDelete"
        },
        {
          "$ref": "#/definitions/YAMLTemplate"
        },
        {
          "$ref": "#/definitions/AddAction"
        },
        {
          "$ref": "#/definitions/AddActionGroup"
        },
        {
          "$ref": "#/definitions/ClusterGlobalConfig"
        },
        {
          "$ref": "#/definitions/HrefNavItem"
        },
        {
          "$ref": "#/definitions/ResourceNSNavItem"
        },
        {
          "$ref": "#/definitions/ResourceClusterNavItem"
        },
        {
          "$ref": "#/definitions/Separator"
        },
        {
          "$ref": "#/definitions/NavSection"
        },
        {
          "$ref": "#/definitions/FileUpload"
        },
        {
          "$ref": "#/definitions/ModelMetadata"
        },
        {
          "$ref": "#/definitions/AlertAction"
        },
        {
          "$ref": "#/definitions/StorageProvider"
        },
        {
          "$ref": "#/definitions/TelemetryListener"
        },
        {
          "$ref": "#/definitions/SupportedCatalogExtensions"
        },
        {
          "$ref": "#/definitions/SupportedActionExtensions"
        },
        {
          "$ref": "#/definitions/SupportedTopologyDetailsExtensions"
        },
        {
          "$ref": "#/definitions/RoutePage"
        },
        {
          "$ref": "#/definitions/ResourceListPage"
        },
        {
          "$ref": "#/definitions/ResourceTabPage"
        },
        {
          "$ref": "#/definitions/ResourceDetailsPage"
        },
        {
          "$ref": "#/definitions/DashboardsTab"
        },
        {
          "$ref": "#/definitions/DashboardsCard"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewHealthPrometheusSubsystem"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewHealthURLSubsystem"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewHealthResourceSubsystem"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewHealthOperator"
        },
        {
          "$ref": "#/definitions/DashboardsInventoryItemGroup"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewInventoryItem"
        },
        {
          "$ref": "#/definitions/DashboardsOverviewResourceActivity"
        },
        {
          "$ref": "#/definitions/TopologyComponentFactory"
        },
        {
          "$ref": "#/definitions/TopologyCreateConnector"
        },
        {
          "$ref": "#/definitions/TopologyDataModelFactory"
        },
        {
          "$ref": "#/definitions/TopologyDisplayFilters"
        },
        {
          "$ref": "#/definitions/TopologyDecoratorProvider"
        },
        {
          "$ref": "#/definitions/TopologyRelationshipProvider"
        },
        {
          "$ref": "#/definitions/CreateResource"
        },
        {
          "$ref": "#/definitions/UserPreferenceGroup"
        },
        {
          "$ref": "#/definitions/UserPreferenceItem"
        },
        {
          "$ref": "#/definitions/Perspective"
        }
      ]
    },
    "FeatureFlag": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.flag"
        },
        "properties": {
          "type": "object",
          "properties": {
            "handler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Used to set/unset arbitrary feature flags."
            }
          },
          "required": [
            "handler"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Gives full control over Console feature flags."
    },
    "EncodedCodeRef": {
      "type": "object",
      "properties": {
        "$codeRef": {
          "type": "string"
        }
      },
      "required": [
        "$codeRef"
      ],
      "additionalProperties": false,
      "description": "Code reference, encoded as an object literal.\n\nThe value of the `$codeRef` property should be formatted as `moduleName.exportName` (referring to a named export) or `moduleName` (referring to the `default` export)."
    },
    "ExtensionFlags": {
      "type": "object",
      "properties": {
        "required": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "disallowed": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "additionalProperties": false,
      "description": "Console feature flags used to gate extension instances."
    },
    "ModelFeatureFlag": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.flag/model"
        },
        "properties": {
          "type": "object",
          "properties": {
            "flag": {
              "type": "string",
              "description": "The name of the flag to set once the CRD is detected."
            },
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "The model which refers to a `CustomResourceDefinition`."
            }
          },
          "required": [
            "flag",
            "model"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new Console feature flag driven by the presence of a CRD on the cluster."
    },
    "ExtensionK8sModel": {
      "type": "object",
      "properties": {
        "group": {
          "type": "string"
        },
        "version": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "required": [
        "group",
        "version",
        "kind"
      ],
      "additionalProperties": false
    },
    "ReduxReducer": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.redux-reducer"
        },
        "properties": {
          "type": "object",
          "properties": {
            "scope": {
              "type": "string",
              "description": "The key to represent the reducer-managed substate within the Redux state object."
            },
            "reducer": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The reducer function, operating on the reducer-managed substate."
            }
          },
          "required": [
            "scope",
            "reducer"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new reducer to Console Redux store which operates on `plugins.<scope>` substate."
    },
    "ContextProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.context-provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "provider": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Context Provider component."
            },
            "useValueHook": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Hook for the Context value."
            }
          },
          "required": [
            "provider",
            "useValueHook"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new React context provider to Console application root."
    },
    "StandaloneRoutePage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.page/route/standalone"
        },
        "properties": {
          "type": "object",
          "properties": {
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the route matches."
            },
            "path": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Valid URL path or array of paths that `path-to-regexp@^1.7.0` understands."
            },
            "exact": {
              "type": "boolean",
              "description": "When true, will only match if the path matches the `location.pathname` exactly."
            }
          },
          "required": [
            "component",
            "path"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new standalone page (rendered outside the common page layout) to Console router."
    },
    "PVCCreateProp": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.pvc/create-prop"
        },
        "properties": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string",
              "description": "Label for the create prop action."
            },
            "path": {
              "type": "string",
              "description": "Path for the create prop action."
            }
          },
          "required": [
            "label",
            "path"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "PVCStatus": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.pvc/status"
        },
        "properties": {
          "type": "object",
          "properties": {
            "priority": {
              "type": "number",
              "description": "Priority for the status component. Bigger value means higher priority."
            },
            "status": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The status component."
            },
            "predicate": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Predicate that tells whether to render the status component or not."
            }
          },
          "required": [
            "priority",
            "status",
            "predicate"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "PVCAlert": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.pvc/alert"
        },
        "properties": {
          "type": "object",
          "properties": {
            "alert": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The alert component."
            }
          },
          "required": [
            "alert"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "PVCDelete": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.pvc/delete"
        },
        "properties": {
          "type": "object",
          "properties": {
            "predicate": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Predicate that tells whether to use the extension or not."
            },
            "onPVCKill": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Method for the PVC delete operation."
            },
            "alert": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Alert component to show additional information."
            }
          },
          "required": [
            "predicate",
            "onPVCKill",
            "alert"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "YAMLTemplate": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.yaml-template"
        },
        "properties": {
          "type": "object",
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "Model associated with the template."
            },
            "template": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The YAML template."
            },
            "name": {
              "type": "string",
              "description": "The name of the template. Use the name `default` to mark this as the default template."
            }
          },
          "required": [
            "model",
            "template",
            "name"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "YAML templates for editing resources via the yaml editor."
    },
    "AddAction": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "dev-console.add/action"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID used to identify the action."
            },
            "groupId": {
              "type": "string",
              "description": "IDs used to identify the action groups the action would belong to."
            },
            "label": {
              "type": "string",
              "description": "The label of the action"
            },
            "description": {
              "type": "string",
              "description": "The description of the action."
            },
            "href": {
              "type": "string",
              "description": "The href to navigate to."
            },
            "icon": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The perspective display icon."
            },
            "accessReview": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/AccessReviewResourceAttributes"
              },
              "description": "Optional access review to control visibility / enablement of the action."
            }
          },
          "required": [
            "id",
            "label",
            "description",
            "href"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "AccessReviewResourceAttributes": {
      "type": "object",
      "properties": {
        "group": {
          "type": "string"
        },
        "resource": {
          "type": "string"
        },
        "subresource": {
          "type": "string"
        },
        "verb": {
          "$ref": "#/definitions/K8sVerb"
        },
        "name": {
          "type": "string"
        },
        "namespace": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "K8sVerb": {
      "type": "string",
      "enum": [
        "create",
        "get",
        "list",
        "update",
        "patch",
        "delete",
        "deletecollection",
        "watch"
      ]
    },
    "AddActionGroup": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "dev-console.add/action-group"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID used to identify the action group."
            },
            "name": {
              "type": "string",
              "description": "The title of the action group"
            },
            "insertBefore": {
              "type": "string",
              "description": "ID of action group before which this group should be placed"
            },
            "insertAfter": {
              "type": "string",
              "description": "ID of action group after which this group should be placed"
            }
          },
          "required": [
            "id",
            "name"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "ClusterGlobalConfig": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.global-config"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Unique identifier for the cluster config resource instance."
            },
            "name": {
              "type": "string",
              "description": "The name of the cluster config resource instance."
            },
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "The model which refers to a cluster config resource."
            },
            "namespace": {
              "type": "string",
              "description": "The namespace of the cluster config resource instance."
            }
          },
          "required": [
            "id",
            "name",
            "model",
            "namespace"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "HrefNavItem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.navigation/href"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of this item."
            },
            "href": {
              "type": "string",
              "description": "The link href value."
            },
            "namespaced": {
              "type": "boolean",
              "description": "if true, adds /ns/active-namespace to the end"
            },
            "prefixNamespaced": {
              "type": "boolean",
              "description": "if true, adds /k8s/ns/active-namespace to the begining"
            },
            "id": {
              "type": "string",
              "description": "A unique identifier for this item."
            },
            "perspective": {
              "type": "string",
              "description": "The perspective ID to which this item belongs to. If not specified, contributes to the default perspective."
            },
            "section": {
              "type": "string",
              "description": "Navigation section to which this item belongs to. If not specified, render this item as a top level link."
            },
            "dataAttributes": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "Adds data attributes to the DOM."
            },
            "startsWith": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Mark this item as active when the URL starts with one of these paths."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. `insertBefore` takes precedence."
            }
          },
          "required": [
            "href",
            "id",
            "name"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "ResourceNSNavItem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.navigation/resource-ns"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "Overrides the default name. If not supplied the name of the link will equal the plural value of the model."
            },
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "The model for which this nav item links to."
            },
            "id": {
              "type": "string",
              "description": "A unique identifier for this item."
            },
            "perspective": {
              "type": "string",
              "description": "The perspective ID to which this item belongs to. If not specified, contributes to the default perspective."
            },
            "section": {
              "type": "string",
              "description": "Navigation section to which this item belongs to. If not specified, render this item as a top level link."
            },
            "dataAttributes": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "Adds data attributes to the DOM."
            },
            "startsWith": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Mark this item as active when the URL starts with one of these paths."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. `insertBefore` takes precedence."
            }
          },
          "required": [
            "id",
            "model"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "ResourceClusterNavItem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.navigation/resource-cluster"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "Overrides the default name. If not supplied the name of the link will equal the plural value of the model."
            },
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "The model for which this nav item links to."
            },
            "id": {
              "type": "string",
              "description": "A unique identifier for this item."
            },
            "perspective": {
              "type": "string",
              "description": "The perspective ID to which this item belongs to. If not specified, contributes to the default perspective."
            },
            "section": {
              "type": "string",
              "description": "Navigation section to which this item belongs to. If not specified, render this item as a top level link."
            },
            "dataAttributes": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "Adds data attributes to the DOM."
            },
            "startsWith": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Mark this item as active when the URL starts with one of these paths."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. `insertBefore` takes precedence."
            }
          },
          "required": [
            "id",
            "model"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "Separator": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.navigation/separator"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "A unique identifier for this item."
            },
            "perspective": {
              "type": "string",
              "description": "The perspective ID to which this item belongs to. If not specified, contributes to the default perspective."
            },
            "section": {
              "type": "string",
              "description": "Navigation section to which this item belongs to. If not specified, render this item as a top level link."
            },
            "dataAttributes": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "Adds data attributes to the DOM."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. `insertBefore` takes precedence."
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "NavSection": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.navigation/section"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of this section. If not supplied, only a separator will be shown above the section."
            },
            "id": {
              "type": "string",
              "description": "A unique identifier for this item."
            },
            "perspective": {
              "type": "string",
              "description": "The perspective ID to which this item belongs to. If not specified, contributes to the default perspective."
            },
            "dataAttributes": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              },
              "description": "Adds data attributes to the DOM."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. `insertBefore` takes precedence."
            }
          },
          "required": [
            "id"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "FileUpload": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.file-upload"
        },
        "properties": {
          "type": "object",
          "properties": {
            "fileExtensions": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Supported file extensions."
            },
            "handler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Function which handles the file drop action."
            }
          },
          "required": [
            "fileExtensions",
            "handler"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "ModelMetadata": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.resource-metadata"
        },
        "properties": {
          "type": "object",
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sGroupModel",
              "description": "The model to customize. May specify only a group, or optional version and kind."
            },
            "badge": {
              "type": "string",
              "enum": [
                "tech",
                "dev"
              ],
              "description": "Whether to consider this model reference as tech preview or dev preview."
            },
            "color": {
              "type": "string",
              "description": "The color to associate to this model."
            },
            "label": {
              "type": "string",
              "description": "Override the label. Requires `kind` be provided."
            },
            "labelPlural": {
              "type": "string",
              "description": "Override the plural label. Requires `kind` be provided."
            },
            "abbr": {
              "type": "string",
              "description": "Customize the abbreviation. Defaults to All uppercase chars in the kind up to 4 characters long. Requires `kind` be provided."
            }
          },
          "required": [
            "model"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Customize the display of models by overriding values retrieved and generated through API discovery."
    },
    "ExtensionK8sGroupModel": {
      "type": "object",
      "properties": {
        "group": {
          "type": "string"
        },
        "version": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "required": [
        "group"
      ],
      "additionalProperties": false
    },
    "AlertAction": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.alert-action"
        },
        "properties": {
          "type": "object",
          "properties": {
            "alert": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "action": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "alert",
            "text",
            "action"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "StorageProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.storage-provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "Component": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "name",
            "Component"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "TelemetryListener": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.telemetry/listener"
        },
        "properties": {
          "type": "object",
          "properties": {
            "listener": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Listen for telemetry events"
            }
          },
          "required": [
            "listener"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "SupportedCatalogExtensions": {
      "anyOf": [
        {
          "$ref": "#/definitions/CatalogItemType"
        },
        {
          "$ref": "#/definitions/CatalogItemProvider"
        },
        {
          "$ref": "#/definitions/CatalogItemFilter"
        }
      ]
    },
    "CatalogItemType": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.catalog/item-type"
        },
        "properties": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Type for the catalog item."
            },
            "title": {
              "type": "string",
              "description": "Title for the catalog item."
            },
            "catalogDescription": {
              "type": "string",
              "description": "Description for the type specific catalog."
            },
            "typeDescription": {
              "type": "string",
              "description": "Description for the catalog item type."
            },
            "filters": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/CatalogItemAttribute"
              },
              "description": "Custom filters specific to the catalog item."
            },
            "groupings": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/CatalogItemAttribute"
              },
              "description": "Custom groupings specific to the catalog item."
            }
          },
          "required": [
            "type",
            "title"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "CatalogItemAttribute": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "attribute": {
          "type": "string"
        }
      },
      "required": [
        "label",
        "attribute"
      ],
      "additionalProperties": false
    },
    "CatalogItemProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.catalog/item-provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "catalogId": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "The unique identifier for the catalog this provider contributes to."
            },
            "type": {
              "type": "string",
              "description": "Type ID for the catalog item type."
            },
            "provider": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Fetch items and normalize it for the catalog. Value is a react effect hook."
            },
            "priority": {
              "type": "number",
              "description": "Priority for this provider. Defaults to 0. Higher priority providers may override catalog items provided by other providers."
            }
          },
          "required": [
            "catalogId",
            "type",
            "provider"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "CatalogItemFilter": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.catalog/item-filter"
        },
        "properties": {
          "type": "object",
          "properties": {
            "catalogId": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "The unique identifier for the catalog this provider contributes to."
            },
            "type": {
              "type": "string",
              "description": "Type ID for the catalog item type."
            },
            "filter": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Filters items of a specific type. Value is a function that takes CatalogItem[] and returns a subset based on the filter criteria."
            }
          },
          "required": [
            "catalogId",
            "type",
            "filter"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "SupportedActionExtensions": {
      "anyOf": [
        {
          "$ref": "#/definitions/ActionProvider"
        },
        {
          "$ref": "#/definitions/ResourceActionProvider"
        },
        {
          "$ref": "#/definitions/ActionGroup"
        },
        {
          "$ref": "#/definitions/ActionFilter"
        }
      ]
    },
    "ActionProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.action/provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "contextId": {
              "type": "string",
              "description": "The context ID helps to narrow the scope of contributed actions to a particular area of the application. Ex - topology, helm"
            },
            "provider": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "A react hook which returns actions for the given scope. If contextId = `resource` then the scope will always be a K8s resource object"
            }
          },
          "required": [
            "contextId",
            "provider"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "ActionProvider contributes a hook that returns list of actions for specific context"
    },
    "ResourceActionProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.action/resource-provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sKindVersionModel",
              "description": "The model for which this provider provides actions for."
            },
            "provider": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "A react hook which returns actions for the given resource model"
            }
          },
          "required": [
            "model",
            "provider"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "ResourceActionProvider contributes a hook that returns list of actions for specific resource model"
    },
    "ExtensionK8sKindVersionModel": {
      "type": "object",
      "properties": {
        "group": {
          "type": "string"
        },
        "version": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "required": [
        "version",
        "kind"
      ],
      "additionalProperties": false
    },
    "ActionGroup": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.action/group"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID used to identify the action section."
            },
            "label": {
              "type": "string",
              "description": "The label to display in the UI. Required for submenus."
            },
            "submenu": {
              "type": "boolean",
              "description": "Whether this group should be displayed as submenu"
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. insertBefore takes precedence."
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "ActionGroup contributes an action group that can also be a submenu"
    },
    "ActionFilter": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.action/filter"
        },
        "properties": {
          "type": "object",
          "properties": {
            "contextId": {
              "type": "string",
              "description": "The context ID helps to narrow the scope of contributed actions to a particular area of the application. Ex - topology, helm"
            },
            "filter": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "A function which will filter actions based on some conditions. scope: The scope in which actions should be provided for. Note: hook may be required if we want to remove the ModifyCount action from a deployment with HPA"
            }
          },
          "required": [
            "contextId",
            "filter"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "ActionFilter can be used to filter an action"
    },
    "SupportedTopologyDetailsExtensions": {
      "anyOf": [
        {
          "$ref": "#/definitions/DetailsTab"
        },
        {
          "$ref": "#/definitions/DetailsTabSection"
        },
        {
          "$ref": "#/definitions/DetailsResourceLink"
        },
        {
          "$ref": "#/definitions/DetailsResourceAlert"
        },
        {
          "$ref": "#/definitions/PodAdapter"
        },
        {
          "$ref": "#/definitions/BuildAdapter"
        },
        {
          "$ref": "#/definitions/NetworkAdapter"
        }
      ]
    },
    "DetailsTab": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/details/tab"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "A unique identifier for this details tab."
            },
            "label": {
              "type": "string",
              "description": "The tab label to display in the UI."
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. insertBefore takes precedence."
            }
          },
          "required": [
            "id",
            "label"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "DetailsTab contributes a tab for the topology details panel."
    },
    "DetailsTabSection": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/details/tab-section"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "A unique identifier for this details tab section."
            },
            "tab": {
              "type": "string",
              "description": "The parent tab ID that this section should contribute to."
            },
            "section": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Returns a section for the graph element or undefined if not provided. SDK component: <Section title={<optional>}>... padded area </Section>"
            },
            "insertBefore": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item before the item referenced here. For arrays, the first one found in order is used."
            },
            "insertAfter": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Insert this item after the item referenced here. For arrays, the first one found in order is used. insertBefore takes precedence."
            }
          },
          "required": [
            "id",
            "tab",
            "section"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "DetailsTabSection contributes a section for a specific tab in topology details panel."
    },
    "DetailsResourceLink": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/details/resource-link"
        },
        "properties": {
          "type": "object",
          "properties": {
            "priority": {
              "type": "number",
              "description": "A higher priority factory will get the first chance to create the link."
            },
            "link": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Return the resource link if provided, otherwise undefined. Use ResourceIcon and ResourceLink for styles."
            }
          },
          "required": [
            "link"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "DetailsResourceLink contributes a link for specific topology context or graph element."
    },
    "DetailsResourceAlert": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/details/resource-alert"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The ID of this alert. Used to save state if the alert shouldn't be shown after dismissed."
            },
            "contentProvider": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Hook to return the contents of the Alert."
            }
          },
          "required": [
            "id",
            "contentProvider"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "DetailsResourceAlert contributes an alert for specific topology context or graph element."
    },
    "PodAdapter": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/adapter/pod"
        },
        "properties": {
          "type": "object",
          "properties": {
            "adapt": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "adapt"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "PodAdapter contributes an adapter to adapt element to data that can be used by Pod component"
    },
    "BuildAdapter": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/adapter/build"
        },
        "properties": {
          "type": "object",
          "properties": {
            "adapt": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "adapt"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "BuildAdapter contributes an adapter to adapt element to data that can be used by Build component"
    },
    "NetworkAdapter": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/adapter/network"
        },
        "properties": {
          "type": "object",
          "properties": {
            "adapt": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "adapt"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "NetworkAdpater contributes an adapter to adapt element to data that can be used by Networking component"
    },
    "RoutePage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.page/route"
        },
        "properties": {
          "type": "object",
          "properties": {
            "perspective": {
              "type": "string",
              "description": "The perspective to which this page belongs to. If not specified, contributes to all perspectives."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the route matches."
            },
            "path": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              ],
              "description": "Valid URL path or array of paths that `path-to-regexp@^1.7.0` understands."
            },
            "exact": {
              "type": "boolean",
              "description": "When true, will only match if the path matches the `location.pathname` exactly."
            }
          },
          "required": [
            "component",
            "path"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new page to Console router."
    },
    "ResourceListPage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.page/resource/list"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sGroupKindModel",
              "description": "The model for which this resource page links to."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the route matches."
            }
          },
          "required": [
            "component",
            "model"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new resource list page to Console router."
    },
    "ExtensionK8sGroupKindModel": {
      "type": "object",
      "properties": {
        "group": {
          "type": "string"
        },
        "version": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "required": [
        "group",
        "kind"
      ],
      "additionalProperties": false
    },
    "ResourceTabPage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.page/resource/tab"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the route matches."
            },
            "name": {
              "type": "string",
              "description": "The name of the tab."
            },
            "href": {
              "type": "string",
              "description": "The optional href for the tab link. If not provided, the first `path` is used."
            },
            "exact": {
              "type": "boolean",
              "description": "When true, will only match if the path matches the `location.pathname` exactly."
            },
            "model": {
              "$ref": "#/definitions/ExtensionK8sGroupKindModel",
              "description": "The model for which this resource page links to."
            }
          },
          "required": [
            "component",
            "model",
            "name"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new resource tab page to Console router."
    },
    "ResourceDetailsPage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.page/resource/details"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sGroupKindModel",
              "description": "The model for which this resource page links to."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the route matches."
            }
          },
          "required": [
            "component",
            "model"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds new resource details page to Console router."
    },
    "DashboardsTab": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/tab"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "A unique tab identifier, used as tab link `href` and when adding cards to this tab."
            },
            "navSection": {
              "type": "string",
              "enum": [
                "home",
                "storage"
              ],
              "description": "NavSection to which the tab belongs to"
            },
            "title": {
              "type": "string",
              "description": "The title of the tab."
            }
          },
          "required": [
            "id",
            "navSection",
            "title"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a new dashboard tab, placed after the Overview tab."
    },
    "DashboardsCard": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/card"
        },
        "properties": {
          "type": "object",
          "properties": {
            "tab": {
              "type": "string",
              "description": "The id of the dashboard tab to which the card will be added."
            },
            "position": {
              "type": "string",
              "enum": [
                "LEFT",
                "RIGHT",
                "MAIN"
              ],
              "description": "The grid position of the card on the dashboard."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Dashboard card component."
            },
            "span": {
              "$ref": "#/definitions/DashboardCardSpan",
              "description": "Card's vertical span in the column. Ignored for small screens, defaults to 12."
            }
          },
          "required": [
            "tab",
            "position",
            "component"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a new dashboard card."
    },
    "DashboardCardSpan": {
      "type": "number",
      "enum": [
        4,
        6,
        12
      ]
    },
    "DashboardsOverviewHealthPrometheusSubsystem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/health/prometheus"
        },
        "properties": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "The display name of the subsystem."
            },
            "queries": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "The Prometheus queries"
            },
            "healthHandler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Resolve the subsystem's health."
            },
            "additionalResource": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Additional resource which will be fetched and passed to `healthHandler`."
            },
            "popupComponent": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Loader for popup content. If defined, a health item will be represented as a link which opens popup with given content."
            },
            "popupTitle": {
              "type": "string",
              "description": "The title of the popover."
            },
            "disallowedProviders": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Cloud providers which for which the subsystem should be hidden."
            }
          },
          "required": [
            "title",
            "queries",
            "healthHandler"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a health subsystem to the status card of Overview dashboard where the source of status is Prometheus."
    },
    "DashboardsOverviewHealthURLSubsystem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/health/url"
        },
        "properties": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "The display name of the subsystem."
            },
            "url": {
              "type": "string",
              "description": "The URL to fetch data from. It will be prefixed with base k8s URL."
            },
            "healthHandler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Resolve the subsystem's health."
            },
            "additionalResource": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Additional resource which will be fetched and passed to `healthHandler`."
            },
            "popupComponent": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Loader for popup content. If defined, a health item will be represented as a link which opens popup with given content."
            },
            "popupTitle": {
              "type": "string",
              "description": "The title of the popover."
            }
          },
          "required": [
            "title",
            "url",
            "healthHandler"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a health subsystem to the status card of Overview dashboard where the source of status is a K8s REST API."
    },
    "DashboardsOverviewHealthResourceSubsystem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/health/resource"
        },
        "properties": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "The display name of the subsystem."
            },
            "resources": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Kubernetes resources which will be fetched and passed to `healthHandler`."
            },
            "healthHandler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Resolve the subsystem's health."
            },
            "popupComponent": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Loader for popup content. If defined, a health item will be represented as a link which opens popup with given content."
            },
            "popupTitle": {
              "type": "string",
              "description": "The title of the popover."
            }
          },
          "required": [
            "title",
            "resources",
            "healthHandler"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a health subsystem to the status card of Overview dashboard where the source of status is a K8s Resource."
    },
    "DashboardsOverviewHealthOperator": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/health/operator"
        },
        "properties": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title of operators section in the popup."
            },
            "resources": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Kubernetes resources which will be fetched and passed to `healthHandler`."
            },
            "getOperatorsWithStatuses": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Resolves status for the operators."
            },
            "operatorRowLoader": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Loader for popup row component."
            },
            "viewAllLink": {
              "type": "string",
              "description": "Links to all resources page. If not provided then a list page of the first resource from resources prop is used."
            }
          },
          "required": [
            "title",
            "resources"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a health subsystem to the status card of Overview dashboard where the source of status is a K8s REST API."
    },
    "DashboardsInventoryItemGroup": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/inventory/item/group"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The id of the status group."
            },
            "icon": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "React component representing the status group icon."
            }
          },
          "required": [
            "id",
            "icon"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds an inventory status group."
    },
    "DashboardsOverviewInventoryItem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/inventory/item"
        },
        "properties": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "model": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The model for `resource` which will be fetched. Used to get the model's `label` or `abbr`."
            },
            "mapper": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Function which maps various statuses to groups."
            },
            "additionalResources": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Additional resources which will be fetched and passed to the `mapper` function."
            }
          },
          "required": [
            "model"
          ]
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds a resource tile to the overview inventory card."
    },
    "DashboardsOverviewResourceActivity": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.dashboards/overview/activity/resource"
        },
        "properties": {
          "type": "object",
          "properties": {
            "k8sResource": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The utilization item to be replaced."
            },
            "isActivity": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Function which determines if the given resource represents the action. If not defined, every resource represents activity."
            },
            "getTimestamp": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Timestamp for the given action, which will be used for ordering."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The action component."
            }
          },
          "required": [
            "k8sResource",
            "component"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Adds an activity to the Activity Card of Overview Dashboard where the triggering of activity is based on watching a K8s resource."
    },
    "TopologyComponentFactory": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/component/factory"
        },
        "properties": {
          "type": "object",
          "properties": {
            "getFactory": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Getter for a ViewComponentFactory"
            }
          },
          "required": [
            "getFactory"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Getter for a ViewComponentFactory"
    },
    "TopologyCreateConnector": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/create/connector"
        },
        "properties": {
          "type": "object",
          "properties": {
            "getCreateConnector": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Getter for the create connector function"
            }
          },
          "required": [
            "getCreateConnector"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Getter for the create connector function"
    },
    "TopologyDataModelFactory": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/data/factory"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Unique ID for the factory."
            },
            "priority": {
              "type": "number",
              "description": "Priority for the factory"
            },
            "resources": {
              "$ref": "#/definitions/WatchK8sResourcesGeneric",
              "description": "Resources to be fetched from useK8sWatchResources hook."
            },
            "workloadKeys": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Keys in resources containing workloads."
            },
            "getDataModel": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Getter for the data model factory"
            },
            "isResourceDepicted": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Getter for function to determine if a resource is depicted by this model factory"
            },
            "getDataModelReconciler": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "Getter for function to reconcile data model after all extensions' models have loaded"
            }
          },
          "required": [
            "id",
            "priority"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Topology Data Model Factory Extension"
    },
    "WatchK8sResourcesGeneric": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "model": {
            "$ref": "#/definitions/ExtensionK8sGroupKindModel"
          },
          "opts": {
            "type": "object",
            "properties": {
              "kind": {
                "$ref": "#/definitions/K8sResourceKindReference"
              },
              "name": {
                "type": "string"
              },
              "namespace": {
                "type": "string"
              },
              "isList": {
                "type": "boolean"
              },
              "selector": {
                "$ref": "#/definitions/Selector"
              },
              "namespaced": {
                "type": "boolean"
              },
              "limit": {
                "type": "number"
              },
              "fieldSelector": {
                "type": "string"
              },
              "optional": {
                "type": "boolean"
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      }
    },
    "K8sResourceKindReference": {
      "anyOf": [
        {
          "$ref": "#/definitions/GroupVersionKind"
        },
        {
          "type": "string"
        }
      ],
      "description": "The canonical, unique identifier for a Kubernetes resource type. Maintains backwards-compatibility with references using the `kind` string field."
    },
    "GroupVersionKind": {
      "type": "string",
      "description": "GroupVersionKind unambiguously identifies a kind. https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupVersionKind TODO: Change this to a regex-type if it ever becomes a thing (https://github.com/Microsoft/TypeScript/issues/6579)"
    },
    "Selector": {
      "type": "object",
      "properties": {
        "matchLabels": {
          "$ref": "#/definitions/MatchLabels"
        },
        "matchExpressions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/MatchExpression"
          }
        }
      },
      "additionalProperties": false
    },
    "MatchLabels": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "MatchExpression": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "operator": {
          "type": "string",
          "enum": [
            "Exists",
            "DoesNotExist",
            "In",
            "NotIn",
            "Equals",
            "NotEqual"
          ]
        },
        "values": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "operator"
      ],
      "additionalProperties": false
    },
    "TopologyDisplayFilters": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/display/filters"
        },
        "properties": {
          "type": "object",
          "properties": {
            "getTopologyFilters": {
              "$ref": "#/definitions/EncodedCodeRef"
            },
            "applyDisplayOptions": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "getTopologyFilters",
            "applyDisplayOptions"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Topology Display Filters Extension"
    },
    "TopologyDecoratorProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/decorator/provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "priority": {
              "type": "number"
            },
            "quadrant": {
              "$ref": "#/definitions/TopologyDecoratorQuadrant"
            },
            "decorator": {
              "$ref": "#/definitions/EncodedCodeRef"
            }
          },
          "required": [
            "id",
            "priority",
            "quadrant",
            "decorator"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Topology Decorator Provider Extension"
    },
    "TopologyDecoratorQuadrant": {
      "type": "string",
      "enum": [
        "upperLeft",
        "upperRight",
        "lowerLeft",
        "lowerRight"
      ]
    },
    "TopologyRelationshipProvider": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.topology/relationship/provider"
        },
        "properties": {
          "type": "object",
          "properties": {
            "provides": {
              "$ref": "#/definitions/EncodedCodeRef"
            },
            "tooltip": {
              "type": "string"
            },
            "create": {
              "$ref": "#/definitions/EncodedCodeRef"
            },
            "priority": {
              "type": "number"
            }
          },
          "required": [
            "provides",
            "tooltip",
            "create",
            "priority"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ],
      "description": "Topology relationship provider connector extension"
    },
    "CreateResource": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.resource/create"
        },
        "properties": {
          "type": "object",
          "properties": {
            "model": {
              "$ref": "#/definitions/ExtensionK8sModel",
              "description": "The model for which this create resource page will be rendered."
            },
            "component": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The component to be rendered when the model matches"
            }
          },
          "required": [
            "model",
            "component"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "UserPreferenceGroup": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.user-preference/group"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID used to identify the user preference group."
            },
            "label": {
              "type": "string",
              "description": "The label of the user preference group"
            },
            "insertBefore": {
              "type": "string",
              "description": "ID of user preference group before which this group should be placed"
            },
            "insertAfter": {
              "type": "string",
              "description": "ID of user preference group after which this group should be placed"
            }
          },
          "required": [
            "id",
            "label"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "UserPreferenceItem": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.user-preference/item"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID used to identify the user preference item and referenced in insertAfter and insertBefore to define the item order."
            },
            "groupId": {
              "type": "string",
              "description": "IDs used to identify the user preference groups the item would belong to."
            },
            "label": {
              "type": "string",
              "description": "The label of the user preference"
            },
            "description": {
              "type": "string",
              "description": "The description of the user preference."
            },
            "field": {
              "$ref": "#/definitions/UserPreferenceField",
              "description": "The input field options used to render the values to set the user preference."
            },
            "insertBefore": {
              "type": "string",
              "description": "ID of user preference item before which this item should be placed"
            },
            "insertAfter": {
              "type": "string",
              "description": "ID of user preference item after which this item should be placed"
            }
          },
          "required": [
            "id",
            "label",
            "description",
            "field"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    },
    "UserPreferenceField": {
      "anyOf": [
        {
          "$ref": "#/definitions/UserPreferenceDropdownField"
        },
        {
          "$ref": "#/definitions/UserPreferenceCheckboxField"
        },
        {
          "$ref": "#/definitions/UserPreferenceCustomField"
        }
      ]
    },
    "UserPreferenceDropdownField": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "dropdown"
        },
        "userSettingsKey": {
          "type": "string"
        },
        "defaultValue": {
          "type": "string"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string"
              },
              "label": {
                "type": "string"
              }
            },
            "required": [
              "value",
              "label"
            ],
            "additionalProperties": false
          }
        }
      },
      "required": [
        "type",
        "userSettingsKey",
        "options"
      ],
      "additionalProperties": false
    },
    "UserPreferenceCheckboxField": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "checkbox"
        },
        "userSettingsKey": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "trueValue": {
          "$ref": "#/definitions/UserPreferenceCheckboxFieldValue"
        },
        "falseValue": {
          "$ref": "#/definitions/UserPreferenceCheckboxFieldValue"
        },
        "defaultValue": {
          "$ref": "#/definitions/UserPreferenceCheckboxFieldValue"
        }
      },
      "required": [
        "type",
        "userSettingsKey",
        "label",
        "trueValue",
        "falseValue"
      ],
      "additionalProperties": false
    },
    "UserPreferenceCheckboxFieldValue": {
      "type": [
        "string",
        "number",
        "boolean"
      ]
    },
    "UserPreferenceCustomField": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "custom"
        },
        "component": {
          "$ref": "#/definitions/EncodedCodeRef"
        },
        "props": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/JSONSchema7Type"
          }
        }
      },
      "required": [
        "type",
        "component"
      ],
      "additionalProperties": false
    },
    "JSONSchema7Type": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        },
        {
          "type": "boolean"
        },
        {
          "$ref": "#/definitions/JSONSchema7Object"
        },
        {
          "$ref": "#/definitions/JSONSchema7Array"
        },
        {
          "type": "null"
        }
      ],
      "description": "Primitive type"
    },
    "JSONSchema7Object": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/JSONSchema7Type"
      }
    },
    "JSONSchema7Array": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/JSONSchema7Type"
      }
    },
    "Perspective": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "const": "console.perspective"
        },
        "properties": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The perspective identifier."
            },
            "name": {
              "type": "string",
              "description": "The perspective display name."
            },
            "icon": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The perspective display icon."
            },
            "default": {
              "type": "boolean",
              "description": "Whether the perspective is the default. There can only be one default."
            },
            "defaultPins": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ExtensionK8sModel"
              },
              "description": "Default pinned resources on the nav"
            },
            "landingPageURL": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The function to get perspective landing page URL."
            },
            "importRedirectURL": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The function to get redirect URL for import flow."
            },
            "usePerspectiveDetection": {
              "$ref": "#/definitions/EncodedCodeRef",
              "description": "The hook to detect default perspective"
            }
          },
          "required": [
            "id",
            "name",
            "icon",
            "landingPageURL",
            "importRedirectURL"
          ],
          "additionalProperties": false
        },
        "flags": {
          "$ref": "#/definitions/ExtensionFlags"
        }
      },
      "required": [
        "properties",
        "type"
      ]
    }
  }
};