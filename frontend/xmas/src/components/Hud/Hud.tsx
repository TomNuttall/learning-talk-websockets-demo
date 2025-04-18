import { GameState } from '../../hooks/useGameState'
import './Hud.scss'

interface HudProps {
  numConnections: number
  numPlayers: number
  gameState: GameState
  onConnect: () => void
  onStart: () => void
}

const Hud: React.FC<HudProps> = ({
  numConnections,
  numPlayers,
  gameState,
  onConnect,
  onStart,
}) => {
  const onClick = () => {
    switch (gameState) {
      case GameState.NoConnection:
        onConnect()
        break
      case GameState.WaitPlayers:
        onStart()
        break
    }
  }

  let buttonText = ''
  switch (gameState) {
    case GameState.NoConnection:
      buttonText = 'Connect'
      break
    case GameState.WaitPlayers:
      buttonText = 'Start Game'
      break
  }

  return (
    <div className="hud">
      <div className="hud__info">
        <div>{`Connections: ${numConnections}`}</div>
        {numPlayers > 0 && (
          <>
            <div>{`Players: ${numPlayers}`}</div>
            {gameState === GameState.WaitPlayers && (
              <div>{`Ready: ${numConnections - 1 === numPlayers}`}</div>
            )}
          </>
        )}
      </div>
      <div className="hud__info">
        {buttonText.length > 0 && (
          <button onClick={onClick}>{buttonText}</button>
        )}
      </div>
    </div>
  )
}

export default Hud
