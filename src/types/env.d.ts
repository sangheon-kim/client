type WageSystem = "hourlyWage" | "dailyWage" | "monthlyWage";

type RegisterForm = {
  name: string;
  birth: string;
  wageSystem: WageSystem;
  givenDate: string;
};
