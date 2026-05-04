interface Architect {
  id: string;
  first_name: string;
  last_name: string;
  category: string | null;
  profile_image_path: string;
  rating: number | null;
  district: {
    name: string;
    region_name: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ArchitectsResponse {
  architects: Architect[];
  total: number;
  page: number;
  size: number;
}
