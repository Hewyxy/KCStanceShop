import SEO from "../components/SEO";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not-found">
            <SEO title="Page Not Found | KCSTANCESHOP" description="The page you requested could not be found." noIndex />
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}
