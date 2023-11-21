import { Button } from 'antd';

import Card from '@/components/card';
import { useThemeToken } from '@/theme/hooks';

type Props = {
  title?: string;
  increase?: boolean;
  path?: string;
  description?: string;
  chartData?: number[];
};

export default function ServicesCard({ title, increase, description, path, chartData }: Props) {
  const themeToken = useThemeToken();
  return (
    <Card>
      <div className="flex-grow">
        <h4 className="text-2xl font-bold">{title}</h4>
        {/* <div className="mb-2 mt-4 flex flex-row">
          {increase ? (
            <SvgIcon icon="ic_rise" size={24} color="rgb(34, 197, 94)" />
          ) : (
            <SvgIcon icon="ic_decline" size={24} color="rgb(255, 86, 48)" />
          )}
          <div className="ml-2">
            <span>{increase ? '+' : '-'}</span>
            <span>{percent}</span>
          </div>
        </div> */}
        <h5 className="text-sm font-medium">{description}</h5>
        <Button
          className="font-mediumtext-black m-auto mt-2 flex items-center justify-center rounded-md px-2 py-1 shadow-none md:m-0"
          style={{ backgroundColor: themeToken.colorPrimary }}
        >
          Explore
        </Button>
      </div>
    </Card>
  );
}
