export class GeocodeData {
  data: GeocodeResponse
}

export class GeocodeResponse {
  results: GeocodeResponseGeometry[];
}

class GeocodeResponseGeometry {
  geometry: GeocodeResponseGeometryLocation;
}

class GeocodeResponseGeometryLocation {
  location: GeocodeResponseGeometryLocationCoordinates;
}

class GeocodeResponseGeometryLocationCoordinates {
  lng: string;
  lat: string;
}
