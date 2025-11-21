from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from backend.app.services.audio_engine import engine

router = APIRouter()

@router.get("/generate")
async def generate_audio(
    mode: str = Query(..., regex="^(focus|relax|sleep)$"),
    duration: int = Query(60, ge=10, le=600) # Limit to 10 mins for demo
):
    """
    Generates an audio session for the given mode.
    Returns a WAV file stream.
    """
    try:
        audio_buffer = engine.generate_session(mode, duration)
        return StreamingResponse(
            audio_buffer, 
            media_type="audio/wav",
            headers={"Content-Disposition": f"attachment; filename={mode}_session.wav"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
