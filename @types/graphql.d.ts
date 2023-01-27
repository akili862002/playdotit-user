import "graphql";
declare module "graphql" {
  interface GraphQLError {
    code: string;
    message: string;
  }
}

declare module global {
  type ZenObservable = any;
}
