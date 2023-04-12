import { Dialog, DialogContent, Fade, Grid, IconButton, Typography, Box } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

function ConfirmBox({ open, closeDialog, deleteFunction, deleteId }) {
    return (
        <Dialog
            fullWidth
            open={open}
            maxWidth="sm"
            scroll="body"
            onClose={closeDialog}
            TransitionComponent={Transition}
        >
            <DialogContent sx={{ px: 8, py: 6, position: 'relative' }}>
                <IconButton size='medium' onClick={closeDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    X
                </IconButton>

                <Grid container spacing={6}>
                    <Grid item xs={12} >
                        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                            {deleteId === "review" ? <Typography variant="h5">Delete Review</Typography>
                                : <Typography variant="h5">Delete Movie</Typography>}
                            {deleteId === "review" ? <Typography variant="body1" sx={{ mb: 2 }}>Are you sure you want to delete this review?</Typography>
                                : <Typography variant="body1" sx={{ mb: 2 }}>Are you sure you want to delete this movie?</Typography>}

                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>

                        <Button onClick={closeDialog} size='medium'
                            variant='secondary'
                            color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={deleteFunction} size='medium'
                            variant='primary float-right'
                            color='error'>
                            Delete
                        </Button>

                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog>
    )
}

export default ConfirmBox