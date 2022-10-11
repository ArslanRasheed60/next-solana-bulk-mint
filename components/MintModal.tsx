/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Alert, Backdrop, Box, CardMedia, Fade, Modal, Snackbar, Stack, Typography } from '@mui/material'
import styles from 'styles/Dashboard.module.css'
import { AlertState } from 'lib/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { candyMachineConfig } from 'config/candyMachine'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import MultipleMint from './MultipleMint'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 650,
  minWidth: 350,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4
}

interface IMintModal {
  handleClose: () => void
  open: boolean
  totalMinted: number
  isMinting: boolean
  itemsRemaining: number
  solscanInfo: string
  alertState: AlertState
  onAlertState: (data: AlertState) => void
  onMinting: () => void
  onFinish: () => void
  onError: () => void
}

const MintModal = ({
  handleClose,
  open,
  isMinting,
  itemsRemaining,
  solscanInfo,
  alertState,
  onAlertState,
  onError,
  onFinish,
  onMinting
}: IMintModal) => {
  const wallet = useWallet()
  //console.log("Check for items remaining",itemsRemaining);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={open}>
        <Box sx={style}>
          <p className={styles.buttonText} style={{ textAlign: 'center', fontSize: 30 }}>
            Mint Now
          </p>
          <CardMedia src="/assets/images/collection.gif" component={'img'} sx={{ borderRadius: 4 }} height={400} width={100} alt="gif" />
          <Stack direction={'row'} spacing={2} mt={2} mb={2} alignItems={'center'}>
            {/* @ts-ignore */}
            { open && (
              <Stack direction={'row'} spacing={0} alignItems="center" justifyContent={'center'}>
                <MultipleMint onError={onError} onFinish={onFinish} onMinting={onMinting} />
              </Stack>
            )}
          </Stack>
          {/* {itemsRemaining === 0 && (
            <>
              <p className={styles.buttonText} style={{ textAlign: 'start', fontSize: 19, alignSelf: 'start' }}>
                Your NFTs has been minted 🥳🥳🥳
              </p>
              {wallet.connected && wallet.publicKey.toBase58() && (
                <Typography color="white" fontWeight={'bold'} variant="button" component={'div'}>
                  You can see your collection at{' '}
                  <Typography
                    color="green"
                    fontWeight={'bold'}
                    component={'a'}
                    href={`https://explorer.solana.com/address/${wallet.publicKey.toBase58()}/tokens?cluster=${candyMachineConfig.network}`}
                    target={'__blank'}
                    sx={{ textDecoration: 'underline' }}
                    mt={3}>
                    Solana Explorer
                  </Typography>
                </Typography>
              )}
            </>
          )} */}
          {solscanInfo !== '' && (
            <Typography color="white" fontWeight={'bold'} variant="button" component={'div'}>
              Mint Succeed you can see your transaction at{' '}
              <Typography
                color="green"
                fontWeight={'bold'}
                component={'a'}
                href={solscanInfo}
                target={'__blank'}
                sx={{ textDecoration: 'underline' }}
                mt={3}>
                solscan
              </Typography>
            </Typography>
          )}
          <Snackbar open={alertState.open} autoHideDuration={6000} onClose={() => onAlertState({ ...alertState, open: false })}>
            <Alert onClose={() => onAlertState({ ...alertState, open: false })} severity={alertState.severity}>
              {alertState.message}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Modal>
  )
}

export default MintModal
