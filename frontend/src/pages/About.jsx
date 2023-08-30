const About = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto text-justify">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        About The Project
      </h1>
      <p className="mb-4 text-slate-700">
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stacks. It includes authentication features
        that allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users. Using Firebase google
        authentication, Google signup/sign-in is also integrated into the
        nodejs.
      </p>
      <p className="mb-4 text-slate-700">
        The front-end of the application is built with React and Redux and uses
        React Router for client-side routing. The back-end is built with Node.js
        and Express, and uses MongoDB as the database. Authentication is
        implemented using JSON Web Tokens (JWT).
      </p>
      <p className="mb-4 text-slate-700">
        authenticated users can carry out various operations such as upload
        profile picture, which is stored on firebase storage, and the photo link
        made available to be saved on mongodb, authenticated users can update
        profile info and update password as well. In the event of not needing
        the account any longer, users can delete their account.
      </p>
    </div>
  );
};

export default About;
