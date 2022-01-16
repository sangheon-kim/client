class AdditionalWage {
  id: string;
  title?: string;
  constructor(private type: string) {
    this.id = new Date().getTime() + "";

    this.defineType();
  }

  getSum() {}

  get getTitle() {
    const TITLE_OF_TYPE = {
      add: "연장근로",
      night: "야간근로",
      holyday: "휴일근로",
      bonus: "상여금",
    };

    return "";

    // return TITLE_OF_TYPE[this.type] || "";
  }

  defineType() {
    switch (this.type) {
      case "add":
      case "night":
      case "holyday":
        this.title = "연장 근로 수당";
      // this.time = 0;
      // this.price = 0;
    }
  }
}

export default AdditionalWage;

// 추가 수당 +
