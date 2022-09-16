export interface IGuardResult {
    succeeded: boolean;
    message?: string;
  }
  
  export interface IGuardArgument {
    fieldValue: any,
    fieldName: string,
  }
  
  export class GuardClauses {
    public static VerifyNullOrUndefined(
      fieldValue: any,
      fieldName: string,
    ): IGuardResult {
      if (fieldValue === null || fieldValue === undefined) {
        return {
          succeeded: false,
          message: `${fieldName} is null or undefined`,
        };
      }
  
      return { succeeded: true };
    }
  
    public static VerifyNullOrUndefinedArray(
      argument: IGuardArgument[],
    ): IGuardResult {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < argument.length; i++) {
        if (argument[i].fieldValue === null || argument[i].fieldValue === undefined) {
          return {
            succeeded: false,
            message: `${argument[i].fieldName} is null or undefined`,
          };
        }
      }
      return { succeeded: true };
    }
  }