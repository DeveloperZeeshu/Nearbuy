import { useNavigate, useRouteError } from "react-router-dom"
import Button from "../components/ui/button/Button"
import Container from "../components/container/Container"

const ErrorPage = () => {
    const error = useRouteError() as any
    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
    }

    if (error.status === 404)
        return (
            <Container>
                <div className="flex flex-col justify-center items-center">
                    <figure>
                        <img
                            className="h-90"
                            src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
                            alt="Error 404"
                        />
                    </figure>
                    <div className="mt-5 mb-8 flex flex-col justify-center items-center">
                        <p className="text-center">The page you were looking for couldn't be found!</p>
                        <p>... Back to previous page.</p>
                    </div>
                    <Button
                        text="Go Back"
                        onClick={handleGoBack}
                    />
                </div>
            </Container>
        )

    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-8">The page you are looking for doesn't exists.</h1>
                <Button
                    text="Go Back"
                    onClick={handleGoBack}
                />
            </div>
        </Container>
    )
}

export default ErrorPage

