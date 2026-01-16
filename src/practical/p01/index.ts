import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

export async function getPostalAddress(): Promise<User[]> {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const users = data.map((user: Record<string, unknown>) => ({
      id: user.id as number,
      name: user.name as string,
      phone: user.phone as string,
      address: user.address ? (user.address as Address) : null,
    }));

    return users;
  } catch (error) {
    return [];
  }
}
