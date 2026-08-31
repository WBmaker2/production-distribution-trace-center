import { missions } from "../../content/missions";
import { ActionButton } from "../../components/ActionButton";
import routeMapImage from "../../assets/generated/fictional-goods-route-map-v2.webp";

interface EntranceScreenProps {
  readonly onStart: () => void;
}

export function EntranceScreen({ onStart }: EntranceScreenProps) {
  return (
    <section className="entrance" aria-label="학습 소개">
      <div className="entrance-intro">
        <p className="entrance-lead">
          상품이 우리 손에 오기까지 여러 단계를 지나가요. <strong>생산·가공·운송·판매·소비 단계</strong>를
          연결하고, 한 조건이 바뀔 때 시간·비용·손실 토큰이 어떻게 달라지는지 추적해 보아요.
        </p>
        <div className="entrance-cta">
          <ActionButton variant="primary" pulse onClick={onStart}>
            경로 추적하기
          </ActionButton>
          <span className="required-badge">필수</span>
        </div>
        <p className="entrance-note">
          이 활동에 나오는 상품·생산자·장소는 모두 <strong>가상의 자료</strong>예요. 실제 가격, 실제 기업,
          환경 등급을 알려 주지 않아요.
        </p>
      </div>
      <figure className="entrance-visual">
        <img
          className="scene-image"
          src={routeMapImage}
          alt="가상 마을의 생산·유통 경로 일러스트: 농원과 공장, 트럭, 가게가 점선 경로로 이어져 있어요"
          width="800"
          height="450"
        />
        <figcaption>장면은 흐름을 상상하기 위한 보조 자료예요. 경로 정보는 글로 확인해요.</figcaption>
      </figure>
      <div className="entrance-details">
        <ul className="entrance-facts" aria-label="활동 정보">
          <li><strong>예상 시간</strong><span>20~30분</span></li>
          <li><strong>응답 저장</strong><span>저장하지 않아요. 새로고침하면 지금까지 기록이 사라져요.</span></li>
          <li><strong>미션</strong><span>미션 6개</span></li>
        </ul>
      </div>
      <section className="entrance-journey" aria-labelledby="mission-index-title">
        <div className="section-heading">
          <h2 id="mission-index-title" className="entrance-subtitle">이번에 만날 미션 여섯 개</h2>
        </div>
        <ol className="mission-list">
          {missions.map((mission, index) => (
            <li key={mission.id}>
              <span className="mission-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="mission-copy">
                <span className="mission-phase">{index < 2 ? "관찰과 조립" : index < 5 ? "조건 비교" : "자료 확인"}</span>
                <span className="mission-title">{mission.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
