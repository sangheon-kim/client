type WageSystem = "hourlyWage" | "dailyWage" | "monthlyWage";

type WorkerType = "fullTime" | "etc" | "none";

type RegisterForm = {
  name: string;
  birth: string;
  wageSystem: WageSystem;
  givenDate: string;
  workerType: string;
};
