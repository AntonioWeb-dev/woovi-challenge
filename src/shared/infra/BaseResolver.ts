interface Response<T> {
  data: T;
  error?: string;
}

export abstract class BaseResolver<L, T> {
  abstract queryExecuter(query?: L): Promise<Response<T> | Response<boolean>>;

  public responseError(err: string): Response<boolean> {
    return {
      data: false,
      error: err,
    };
  }
}
