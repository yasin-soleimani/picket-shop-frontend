// export interface CountryCode {
//   nameFa: string;
//   name: string;
//   dial_code: string;
//   code: string;
//   flag: string;
//   preferred?: boolean;
// }

// export default class CountryCodes {
//   private data: CountryCode[];

//   constructor() {
//     this.data = [];
//     this.loadData();
//   }

//   get countryCodes(): CountryCode[] {
//     return this.data;
//   }

//   search(searchParams: string): CountryCode[] {
//     const normalizedSearchParam = searchParams.toLowerCase();
//     return this.data.filter(
//       (el) =>
//         el.name.toLowerCase().includes(normalizedSearchParam) ||
//         el.nameFa.includes(normalizedSearchParam) ||
//         el.dial_code.includes(normalizedSearchParam)
//     );
//   }

//   private loadData(): void {
//     import("../../assets/json/country-codes.json").then((data) => {
//       this.data = data.default;
//     });
//   }
// }
