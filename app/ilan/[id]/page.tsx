import IlanDetaySayfaClient from "./IlanDetayClient";

export default function IlanDetayPage({ params }: { params: { id: string } }) {
  return <IlanDetaySayfaClient id={params.id} />;
}
