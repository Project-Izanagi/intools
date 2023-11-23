import axios from 'axios';
import { useEffect, useState } from 'react';

interface DataType {
  no: number;
  plant: string;
  category: string;
  area: string;
  qcode: string;
  name: string;
  maker: string;
  specifications: {
    capacity: number;
    voltage: number;
    current: number;
    rpm: number;
  };
  size: {
    shaft_diameter: number;
    base_width: number;
    base_length: number;
    c: number;
    e: number;
    h: number;
  };
}

const mapApiResponseToDataType = (apiResponse: any): DataType[] => {
  if (apiResponse && apiResponse.items && Array.isArray(apiResponse.items)) {
    return apiResponse.items.map((item: any) => {
      const {
        id,
        plant_name,
        category,
        area,
        qcode,
        name,
        maker,
        capacity,
        voltage,
        current,
        rpm,
        shaft_diameter,
        base_width,
        base_length,
        c,
        e,
        h,
      } = item;

      if (
        id !== undefined &&
        plant_name !== undefined &&
        category !== undefined &&
        area !== undefined &&
        qcode !== undefined &&
        name !== undefined &&
        maker !== undefined &&
        capacity !== undefined &&
        voltage !== undefined &&
        current !== undefined &&
        rpm !== undefined &&
        shaft_diameter !== undefined &&
        base_width !== undefined &&
        base_length !== undefined &&
        c !== undefined &&
        e !== undefined &&
        h !== undefined
      ) {
        return {
          no: id,
          plant: plant_name,
          category,
          area,
          qcode,
          name,
          maker,
          specifications: {
            capacity,
            voltage,
            current,
            rpm,
          },
          size: {
            shaft_diameter,
            base_width,
            base_length,
            c,
            e,
            h,
          },
        };
      } else {
        console.error('Item is missing necessary properties:', item);
        return undefined;
      }
    });
  } else {
    console.error('API response is not in the expected format:', apiResponse);
    return [];
  }
};

const useFetchData = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>(
          'http://127.0.0.1:8080/api/v1/intools/electra/materials/motor/high-voltage',
        );

        console.log('API Response:', response.data);

        const mappedData = mapApiResponseToDataType(response.data);
        setData(mappedData.filter(Boolean)); // Remove undefined items
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;
