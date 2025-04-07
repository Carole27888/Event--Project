/* eslint-disable no-unused-vars */
function Event({ id, title, image, rating, description }) {
    return (
      <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <p>{description}</p>
        <p>Rating: {rating}</p>
      </div>
    );
  }
  
  function Testimonial({ id, name, comment, rating }) {
    return (
      <div>
        <h3>{name}</h3>
        <p>{comment}</p>
        <p>Rating: {rating}</p>
      </div>
    );
  }
  
  function TeamMember({ id, name, role, avatar }) {
    return (
      <div>
        <img src={avatar} alt={name} />
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
    );
  }
  