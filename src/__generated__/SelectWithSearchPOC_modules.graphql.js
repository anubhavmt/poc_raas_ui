/**
 * @generated SignedSource<<dc29346d3bd4955de38f360a32cc932a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  "module",
  "listModules"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "milestoneIds"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "moduleTypes"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "searchText"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "seriesIds"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ModuleListDataRefetchQuery.graphql')
    }
  },
  "name": "SelectWithSearchPOC_modules",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ModuleQuery",
      "kind": "LinkedField",
      "name": "module",
      "plural": false,
      "selections": [
        {
          "alias": "listModules",
          "args": [
            {
              "kind": "Variable",
              "name": "milestoneIds",
              "variableName": "milestoneIds"
            },
            {
              "kind": "Variable",
              "name": "moduleTypes",
              "variableName": "moduleTypes"
            },
            {
              "kind": "Variable",
              "name": "searchText",
              "variableName": "searchText"
            },
            {
              "kind": "Variable",
              "name": "seriesIds",
              "variableName": "seriesIds"
            }
          ],
          "concreteType": "ModuleList",
          "kind": "LinkedField",
          "name": "__ModuleListData_listModules_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ModuleEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Module",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "type",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Series",
                      "kind": "LinkedField",
                      "name": "parentList",
                      "plural": true,
                      "selections": [
                        (v1/*: any*/),
                        (v2/*: any*/)
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

node.hash = "5d56fd793aab7e833197df767100f9e2";

module.exports = node;
