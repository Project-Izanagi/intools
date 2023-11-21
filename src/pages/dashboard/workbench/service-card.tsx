import Card from '@/components/card';

type Props = {
  title?: string;
  increase?: boolean;
  percent?: string;
  description?: string;
  chartData?: number[];
};
export default function ServicesCard({ title, increase, description, percent, chartData }: Props) {
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
      </div>
    </Card>
  );
}
