import { Link } from "react-router-dom"

const TalkToChat = () => {
  return (
    <section className="container mx-auto px-4 py-24">
      <h3 className="text-center font-semibold text-3xl mb-4">Chat Bot</h3>
      <p className="text-center font-semibold text-xl mb-8 capitalize">Talk to our new chatbot and get a recommendation !</p>
      <Link to="/chatbot" className="bg-secondary hover:bg-accent duration-200 text-white py-3 px-7 block w-fit mx-auto">Chatbot</Link>
    </section>
  )
}

export default TalkToChat