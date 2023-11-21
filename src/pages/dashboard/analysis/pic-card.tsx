import { CSSProperties } from 'react';

type Props = {
  team: string;
  name: string;
  phone: string;
  email: string;
  photo?: string;
  style?: CSSProperties;
};

export default function PICCard({ team, name, phone, email, photo, style }: Props) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-xs">
        <div className="bg-white rounded-lg py-3 shadow-xl">
          <div className="photo-wrapper p-2">
            <img className="mx-auto h-32 w-32 rounded-full" src={photo} alt="John Doe" />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl font-medium leading-8 text-gray-900">{name}</h3>
            <div className="text-center text-xs font-semibold text-gray-600">
              <p>{team}</p>
            </div>
            <table className="my-3 text-xs">
              <tbody>
                {/* <tr>
                  <td className="px-2 py-2 font-semibold text-gray-900">Address</td>
                  <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                </tr> */}
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-900">Phone</td>
                  <td className="px-2 py-2">{phone}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-900">Email</td>
                  <td className="px-2 py-2">{email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
