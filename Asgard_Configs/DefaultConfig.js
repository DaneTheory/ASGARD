import fs from 'fs'
import mkdirp from 'mkdirp'

import Options from './Options'
import DefaultAppConfig from '../DefaultAppConfig'


const config = DefaultAppConfig()

const initialConfig = {
  mediaRootDir: Options.primaryStoragePath,
  videoRootDir: Options.primaryVideoDirPath,
  musicRootDir: Options.primaryMusicDirPath,
  photosRootDir: Options.primaryPhotosDirPath,
  gamesRootDir: Options.primaryGamesDirPath,
}

const rootPath = config.get('rootDirPath')
const defaultPublicDirPath = `${rootPath}/public`
const masterMediaFilePathStr = `${rootPath}/public/MEDIA`
const masterMediaFilePathSubDirs = {
  video: `${rootPath}/public/MEDIA/VIDEO`,
  music: `${rootPath}/public/MEDIA/MUSIC`,
  photos: `${rootPath}/public/MEDIA/PHOTOS`,
  games: `${rootPath}/public/MEDIA/GAMES`
}

const mediaDirPathHandler = () => initialConfig.mediaRootDir === '' ? generateDefaultMediaRootPath() : initialConfig.mediaRootDir

const generateDefaultMediaRootPath = async () => {
  try {
    const masterMediaDir = () => mkdirp(`${rootPath}/public/MEDIA`, (err) => err ? console.error(err) : console.log('Master Media Directory Created'))
    const videoSubDir = () => mkdirp(`${rootPath}/public/MEDIA/VIDEO`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Video'))
    const musicSubDir = () => mkdirp(`${rootPath}/public/MEDIA/MUSIC`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Music'))
    const photosSubDir = () => mkdirp(`${rootPath}/public/MEDIA/PHOTOS`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Photos'))
    const gamesSubDir = () => mkdirp(`${rootPath}/public/MEDIA/GAMES`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Games'))

    let finalFlagCheck

    const verifyCurrentFileDirectory = (flag, dir) =>
      new Promise((resolve, reject) => {
        const fsAsyncCheck = (dir) => fs.existsSync(dir) ? flag = true : flag = false
        return flag ? reject(new Error('Public Directory containing Master Media root path Dir already exists')) : resolve(`SUCCESS: Master Media Root Dir Does not Already Exist. Creating Master Media Root Dir at: ${masterMediaFilePathStr}`)
      })

    const fileDirVerificationHandler = async (fileDir) => {
      let doesMasterMediaDirStructureExistFlag
      const result = await verifyCurrentFileDirectory(doesMasterMediaDirStructureExistFlag, fileDir)
      return result
    }

    const finalFileSystemDirVerificationHandler = (rootPublicDirPath) => {
      fs.existsSync(rootPublicDirPath) ? finalFlagCheck = false : finalFlagCheck = true
      return finalFlagCheck
    }

    const createMasterMediaRootDir = () =>
      Promise.resolve()
        .then(async () => {
          console.info(`Creating Master Media Root Directory....`)
          const result = await masterMediaDir()
          return result
        })
        .catch(e => {
          console.error(e)
          return new Error(e)
        })

    const createMediaSubDirs = () =>
      Promise.resolve()
        .then(async () => {
          console.info(`Creating Media Sub Directory: VIDEO`)
          const result = await videoSubDir()
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: MUSIC`)
          const result = await musicSubDir()
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: PHOTOS`)
          const result = await photosSubDir()
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: GAMES`)
          const result = await gamesSubDir()
          return result
        })
        .then(async () => {
          console.info('Verifying all build steps completed successfuly...')
        })
        .then(async () => {
          console.info(`1. Video Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(masterMediaFilePathSubDirs.video)
          return result
        })
        .then(async () => {
          console.info(`2. Music Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(masterMediaFilePathSubDirs.music)
          return result
        })
        .then(async () => {
          console.info(`3. Photos Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(masterMediaFilePathSubDirs.photos)
          return result
        })
        .then(async () => {
          console.info(`4. Games Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(masterMediaFilePathSubDirs.games)
          return result
        })
        .then(() => {
          console.info(`Media Sub Directory File System Verification: SUCCESS`)
          console.info(`-----------------------------------------------------`)
          console.info(`Dynamic generation of the Master Media Directory, and it's sub directories COMPLETE`)
          console.info(`;)`)
        })
        .catch(e => {
          console.error(e)
          return new Error(e)
        })

      const createNewMediaFileSystemDirectory = async () =>
        await fileDirVerificationHandler(masterMediaFilePathStr)
          .then(() => {
            console.log(`Master Media Root Directory Existence Verification Complete.`)
            console.log(`Result: Master Media Root Directory does not currently exist. (SUCCESS)`)
          })
          .then(async () => {
            console.log(`Proceeding with further build steps...`)
            const result = await createMasterMediaRootDir()
            return result
          })
          .then(async () => {
            console.log(`Proceeding with further build steps...`)
            console.log(`Creating Media Sub Directories...`)
            const result = await createMediaSubDirs()
            return result
          })
          .catch(e => {
            console.error(e)
            return new Error(e)
          })

      const skipCreatingNewMediaFileSystem = () => {
        console.info(`Master Media Root Directory And It's Sub Directories Already Exist.`)
        console.info(`Bypassing New File System Directory Generation To Avoid Overwritting Existing Data.`)
        console.info(`;)`)
        return true
      }
      return finalFileSystemDirVerificationHandler(defaultPublicDirPath) ? createNewMediaFileSystemDirectory() : skipCreatingNewMediaFileSystem()
  }
  catch (err) {
    console.error(err)
    return new Error(err)
  }
}

const DefaultConfig = () => {
  let defaultConfigObj = {}
  
  const noUserProvidedPathInput = () =>
    Promise.resolve()
      .then(() => generateDefaultMediaRootPath())
      .then(() => {
        defaultConfigObj.rootPath = config.get('rootDirPath')
        defaultConfigObj.defaultPublicDirPath = defaultPublicDirPath
        defaultConfigObj.mediaRootDir = masterMediaFilePathStr
        defaultConfigObj.videoRootDir = masterMediaFilePathSubDirs.video
        defaultConfigObj.musicRootDir = masterMediaFilePathSubDirs.music
        defaultConfigObj.photosRootDir = masterMediaFilePathSubDirs.photos
        defaultConfigObj.gamesRootDir = masterMediaFilePathSubDirs.games
        return defaultConfigObj
      })
      .then(data => data)
      .catch(e => {
        console.error(e)
        return new Error(e)
      })

  const userDidProvidedPathInput = () =>
    Promise.resolve()
      .then(() => {
        defaultConfigObj.rootPath = config.get('rootDirPath')
        defaultConfigObj.defaultPublicDirPath = null
        defaultConfigObj.mediaRootDir = Options.primaryStoragePath
        defaultConfigObj.videoRootDir = Options.primaryVideoDirPath
        defaultConfigObj.musicRootDir = Options.primaryMusicDirPath
        defaultConfigObj.photosRootDir = Options.primaryPhotosDirPath
        defaultConfigObj.gamesRootDir = Options.primaryGamesDirPath
        return defaultConfigObj
      })
      .then(data => data)
      .catch(e => {
        console.error(e)
        return new Error(e)
      })

  return initialConfig.mediaRootDir === '' ?
    noUserProvidedPathInput()
      .then(data => data)
      .catch(e => {
        console.error(e)
        return new Error(e)
      })
    :
    userDidProvidedPathInput()
      .then(data => data)
      .catch(e => {
        console.error(e)
        return new Error(e)
      })
}



export default DefaultConfig
