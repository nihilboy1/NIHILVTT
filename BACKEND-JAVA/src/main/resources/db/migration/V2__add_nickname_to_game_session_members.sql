ALTER TABLE IF EXISTS game_session_members
  ADD COLUMN IF NOT EXISTS nickname VARCHAR(30);

UPDATE game_session_members gsm
SET nickname = (
  SELECT u.name
  FROM users u
  WHERE u.id = gsm.user_id
)
WHERE gsm.nickname IS NULL OR TRIM(gsm.nickname) = '';

UPDATE game_session_members
SET nickname = 'Player'
WHERE nickname IS NULL OR TRIM(nickname) = '';

ALTER TABLE IF EXISTS game_session_members
  ALTER COLUMN nickname SET NOT NULL;
