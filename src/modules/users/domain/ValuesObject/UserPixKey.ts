import { Failable } from '@shared/logic/Result';
import { randomBytes } from 'crypto';
import { KindKeys, TypePixKeys } from '../interface/IUserProps';


export class UserPixKey {
  props: TypePixKeys;

  private constructor(props: TypePixKeys) {
    this.props = props;
  }

  public get key(): string {
    return this.props.key || '';
  }

  public get actived(): boolean {
    return this.props.actived;
  }

  public get kind(): KindKeys {
    return this.props.kind;
  }

  public get created_at(): Date {
    return this.props.created_at || new Date();
  }

  public get updated_at(): Date {
    return this.props.updated_at || new Date();
  }

  public genereteRandomKey(): void {
    const key = randomBytes(48).toString('hex');
    this.props.key = key;
  }

  public static create(props: TypePixKeys): Failable<UserPixKey, string> {
    const propsRequest = {
      ...props,
      created_at: props.created_at || new Date(),
      updated_at: props.updated_at || new Date(),
    };
    const pixKey = new UserPixKey(propsRequest);
    if (!props.key) {
      pixKey.genereteRandomKey();
    }

    return { isError: false, value: pixKey };
  }
}
