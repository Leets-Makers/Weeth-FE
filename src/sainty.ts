import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'tn0j01pf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-20',
});

// 팝업 데이터를 가져오는 함수
export async function getActivePopup() {
  const query = `*[_type == "popup" && isActive == true && now() >= startDate && now() <= endDate][0]{
    title,
    content,
    "imageUrl": image.asset->url, 
    linkUrl,
    startDate,
    endDate
  }`;

  return client.fetch(query);
}
