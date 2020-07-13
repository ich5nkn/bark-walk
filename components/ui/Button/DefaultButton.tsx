import Button from '@material-ui/core/Button'

const DefaultButton = (children: any) => {
    return (
        <Button
            variant='contained'
            color='primary'
        >
            {children}
        </Button>
    )
}

export default DefaultButton;