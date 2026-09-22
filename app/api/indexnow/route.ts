import { NextResponse } from 'next/server';

export async function GET() {
  const host = 'swaphubs.com';
  const key = '02de353ea7f34c5db5448385d852cc59'; 
  const keyLocation = `https://${host}/${key}.txt`;

  const urlList = [
    `https://${host}/llms.txt`,
    `https://${host}/terzi`,
    `https://${host}/en/hotel-tailor-antalya`,
    `https://${host}/ru/vyezdnoy-portnoy-antalya`,
    `https://${host}/de/schneider-service-hotel-antalya`
  ];

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList
      })
    });

    return NextResponse.json({ 
      success: true, 
      message: "SwapHubs sayfaları için arama motorlarına ping atıldı!",
      status: response.status 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ping işlemi başarısız' }, { status: 500 });
  }
}
