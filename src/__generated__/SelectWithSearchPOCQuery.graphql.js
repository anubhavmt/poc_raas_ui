/**
 * @generated SignedSource<<d28f990cc31c0a24820b4e906ca482fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "milestoneIds"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "moduleTypes"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchText"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesIds"
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectWithSearchPOCQuery",
    "selections": [
      {
        "args": (v6/*: any*/),
        "kind": "FragmentSpread",
        "name": "SelectWithSearchPOC_modules"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "SelectWithSearchPOCQuery",
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
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "ModuleList",
            "kind": "LinkedField",
            "name": "listModules",
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
                      (v7/*: any*/),
                      (v8/*: any*/),
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
                          (v7/*: any*/),
                          (v8/*: any*/)
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
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": [
              "searchText",
              "seriesIds",
              "milestoneIds",
              "moduleTypes"
            ],
            "handle": "connection",
            "key": "ModuleListData_listModules",
            "kind": "LinkedHandle",
            "name": "listModules"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b75efabf7a627256610cbf0059fe9ea1",
    "id": null,
    "metadata": {},
    "name": "SelectWithSearchPOCQuery",
    "operationKind": "query",
    "text": "query SelectWithSearchPOCQuery(\n  $first: Int\n  $after: ID\n  $searchText: String\n  $seriesIds: [ID!]\n  $milestoneIds: [ID!]\n  $moduleTypes: [ModuleType!]\n) {\n  ...SelectWithSearchPOC_modules_38reyY\n}\n\nfragment SelectWithSearchPOC_modules_38reyY on Query {\n  module {\n    listModules(first: $first, after: $after, searchText: $searchText, seriesIds: $seriesIds, milestoneIds: $milestoneIds, moduleTypes: $moduleTypes) {\n      edges {\n        node {\n          id\n          name\n          type\n          parentList {\n            id\n            name\n          }\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

node.hash = "53a71756b8d74d440509b4b885a06a7d";

module.exports = node;
