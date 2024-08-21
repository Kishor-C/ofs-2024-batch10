/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import 'ojs/ojtable';
class IncidentsViewModel {

  dataprovider : RESTDataProvider<any, any>;
  constructor() {
    this.dataprovider = new RESTDataProvider({
      keyAttributes: 'id',
      url: 'http://localhost:9999/users',
      // fetchByOffset and fetchByKeys delegate to fetchFirst if their capabilities are not defined
      // so at minimum we must specify transforms for fetchFirst
      transforms: {
        fetchFirst: {
          request: async (options) => {
            // Use size and offset to set the expected paging parameters and create a request.
            // In this example, "size" corresponds to the endpoint' "limit"
            // parameter and "offset" corresponds to the endpoint' "offset" parameter for the mock
            // server.
            const url = new URL(options.url);
            
            return new Request(url.href);
          },
          response: async ({ body }) => {
            console.log(body);
            // The mock server sends back a response body with shape { hasMore, totalSize, data } so
            // we need to extract and return them
            const data  = body;
            return { data };
          }
        }
      }
    });
  }
}

export = IncidentsViewModel;
