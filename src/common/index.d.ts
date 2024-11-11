export namespace Generation {
  export interface Args {
    path: string;
    template: string;
  }

  export interface ComponentInfo {
    name: string;
    path: string[];
  }
}
