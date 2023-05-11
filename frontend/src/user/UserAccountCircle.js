export default function UserAccountCircle({imageURL}) {
  return (
    <div 
      className="rounded-circle"
      style={
        { backgroundImage: `url(${imageURL})` }
      }
    ></div>
  )
};