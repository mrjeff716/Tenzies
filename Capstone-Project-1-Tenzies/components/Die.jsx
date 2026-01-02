export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <button 
    className="die-button"
    style={style} onClick={() => props.hold(props.id)}
    aira-pressed={props.isHeld ? "true" : "false"}
    aira-label={`Die with a value ${props.value}, ${props.isHeld ? "Held" : "Not held"}`}
    >
    {props.value}</button>
  )
}