import { missions } from "../../content/missions";
import { ActionButton } from "../../components/ActionButton";

interface EntranceScreenProps {
  readonly onStart: () => void;
}

export function EntranceScreen({ onStart }: EntranceScreenProps) {
  return (
    <section className="entrance" aria-label="학습 소개">
      <p className="entrance-lead">
        상품이 우리 손에 오기까지 여러 단계를 지나가요.{" "}
        <strong>생산·가공·운송·판매·소비 단계</strong>를 연결하고, 한 조건이 바뀔 때
        시간·비용·잃음 토큰이 어떻게 달라지는지 추적해 보아요.
      </p>
      <p className="entrance-note">
        이 활동에 나오는 상품·생산자·장소는 모두 <strong>가상의 자료</strong>예요. 실제
        가격, 실제 기업, 환경 등급을 알려 주지 않아요.
      </p>
      <div className="entrance-cta">
        <ActionButton variant="primary" pulse onClick={onStart}>
          경로 추적하기
        </ActionButton>
        <span className="required-badge">필수</span>
      </div>
      <ul className="entrance-facts">
        <li>
          <strong>예상 시간</strong> 20~30분
        </li>
        <li>
          <strong>응답 저장</strong> 저장하지 않아요. 새로고침하면 지금까지 기록이
          사라져요.
        </li>
        <li>
          <strong>미션</strong> 검수된 미션 6개
        </li>
      </ul>
      <h2 className="entrance-subtitle">이번에 만날 미션 여섯 개</h2>
      <ol className="mission-list">
        {missions.map((mission, index) => (
          <li key={mission.id}>
            <span className="mission-number" aria-hidden="true">
              {index + 1}
            </span>
            <span className="mission-title">{mission.title}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
