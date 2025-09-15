interface Route {
  name: string;
  routeID: string;
}

export const routes: Route[] = [
  {
    name: "مقدمة",
    routeID: "intro",
  },
  {
    name: "عطر",
    routeID: "about",
  },

  {
    name: "تركيبة العطر",
    routeID: "composition",
  },
  {
    name: "اتصل بنا",
    routeID: "form",
  },
];
