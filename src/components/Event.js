import "./Event.css";
import "dayjs/locale/de";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import * as relativeTime from "dayjs/plugin/relativeTime";
import Heart from "./Heart";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("de");

function Event(props) {
  const date = dayjs(props.startDate);
  const duration = dayjs
    .duration(dayjs(props.endDate).diff(props.startDate))
    .humanize();

  return (
    <section className={"event " + (props.favorite ? "favorite" : "")}>
      <img src={props.image} alt={`Heroimage für ${props.summary}`} />
      <div className="time">
        {date.format("DD.MM. HH:mm")} &bull; {duration}
      </div>
      <div className="summary">{props.summary}</div>
      <footer>
        <a href={props.url}>Details</a>
        <Heart
          enabled={props.isFavorite}
          toggle={(_) => {
            props.toggleFavorite(props.url);
          }}
        />
      </footer>
    </section>
  );
}

export default Event;
