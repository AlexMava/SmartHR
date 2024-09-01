const AppFooter = () => {
    const date = new Date(),
        year = date.getFullYear();

    return (
        <footer className='footer'>
            <div className="container">
                <div className="row">
                    <p>©{year} SmartHR Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default AppFooter;