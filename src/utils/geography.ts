import geography from "@/assets/data/geography.json";

const provinces = () => {
  return geography.provinces.map((province) => province.name);
};

const cities = (provinceName: string) => {
  return (
    geography.provinces.find((province) => province.name === provinceName)
      ?.cities || []
  );
};

export { provinces, cities };
