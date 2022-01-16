interface DefaultDataFetchObject<T = {}, E = {}> {
  loading: boolean;
  data: any;
  error: unknown;
}

type CountProperty = "count";

type CountState = Record<Property, DefaultDataFetchObject | any>;

type EnvState = {
  device: "pc" | "ph" | "";
};

type DefaultRootState = {
  count: CountState;
  env: EnvState;
};
