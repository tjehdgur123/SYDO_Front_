import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getStylingAdvice(imageBase64: string) {
  try {
    const prompt = `
      당신은 패션 전문가 AI입니다. 
      사용자가 업로드한 옷 사진을 분석하여 다음 항목을 핵심 위주로 아주 간결하게 답변해주세요.
      인사말이나 서론은 생략하고 바로 본론으로 들어가세요.
      마크다운 형식을 사용하세요.

      ### 1. 스타일 정의
      - 이 아이템의 핵심 스타일 (단어 위주)
      
      ### 2. 추천 매치
      - 가장 잘 어울리는 상/하의 조합 1-2개
      
      ### 3. 스타일링 포인트
      - 한 줄 요약 팁 2-3가지
    `;

    const imagePart = {
      inlineData: {
        data: imageBase64.split(",")[1],
        mimeType: "image/jpeg",
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [imagePart, textPart] }],
    });

    return response.text ?? "분석 결과를 가져올 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI 분석 중 오류가 발생했습니다.");
  }
}
