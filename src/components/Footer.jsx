import { FaGithub, FaLinkedin, FaEnvelope, FaGit } from "react-icons/fa";

const Footer = () => {
  return (
		<footer className="fixed bottom-0 w-full bg-purple-950 text-white py-3 px-4 flex justify-center items-center gap-6 z-10">
			<a href="https://github.com/JCesar206" target="_blank" rel="noopener noreferrer">
				<FaGithub className="hover:text-purple-500" size={20} />
			</a>
			<a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noopener noreferrer">
				<FaLinkedin className="hover:text-rose-500" size={20} />
			</a>
			<a href="mailto:jcesar206@hotmail.com">
				<FaEnvelope className="hover:text-lime-500" size={20} />
			</a>
			<span className="text-sm ml-4">&copy; {new Date().getFullYear()} Villain Dashboard V 1.0 JulyDevops Todos los derechos reservados.</span>
		</footer>
	);
}

export default Footer;