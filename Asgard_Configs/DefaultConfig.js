import fs from 'fs'
import mkdirp from 'mkdirp'

import Options from './Options'
import DefaultAppConfig from '../DefaultAppConfig'


const config = DefaultAppConfig()

const initialConfig = {
  mediaRootDir: Options.primaryMediaPath,
  videoRootDir: `${Options.primaryMediaPath}/VIDEO`,
  musicRootDir: `${Options.primaryMediaPath}/MUSIC`,
  photosRootDir: `${Options.primaryMediaPath}/PHOTOS`,
  gamesRootDir: `${Options.primaryMediaPath}/GAMES`,
}

const rootPath = config.get('rootDirPath')
const masterMediaFilePathStr = `${rootPath}/MEDIA`
const masterMediaFilePathSubDirs = {
  video: `${masterMediaFilePathStr}/VIDEO`,
  music: `${masterMediaFilePathStr}/MUSIC`,
  photos: `${masterMediaFilePathStr}/PHOTOS`,
  games: `${masterMediaFilePathStr}/GAMES`
}

const masterMediaDir = (dir) => mkdirp(`${dir}`, (err) => err ? console.error(err) : console.log('Master Media Directory Created'))
const videoSubDir = (dir) => mkdirp(`${dir}`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Video'))
const musicSubDir = (dir) => mkdirp(`${dir}`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Music'))
const photosSubDir = (dir) => mkdirp(`${dir}`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Photos'))
const gamesSubDir = (dir) => mkdirp(`${dir}`, (err) => err ? console.error(err) : console.log('Media Subdirectory SUCCESSFULLY Created: Games'))

const mediaDirPathHandler = () => initialConfig.mediaRootDir === null ? generateDefaultMediaRootPath() : initialConfig.mediaRootDir

const generateDefaultMediaRootPath = async () => {
  try {
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
          const result = await masterMediaDir(masterMediaFilePathStr)
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
          const result = await videoSubDir(masterMediaFilePathSubDirs.video)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: MUSIC`)
          const result = await musicSubDir(masterMediaFilePathSubDirs.music)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: PHOTOS`)
          const result = await photosSubDir(masterMediaFilePathSubDirs.photos)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: GAMES`)
          const result = await gamesSubDir(masterMediaFilePathSubDirs.games)
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
        return true
      }
      return finalFileSystemDirVerificationHandler(masterMediaFilePathStr) ? createNewMediaFileSystemDirectory() : skipCreatingNewMediaFileSystem()
  }
  catch (err) {
    console.error(err)
    return new Error(err)
  }
}

const generateUserDefinedMediaRootPath = async () => {
  try {
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

    const finalFileSystemDirVerificationHandler = (userDefinedMediaRoot) => {
      fs.existsSync(`${userDefinedMediaRoot}`) ? finalFlagCheck = false : finalFlagCheck = true
      return finalFlagCheck
    }

    const createMasterMediaRootDir = () =>
      Promise.resolve()
        .then(async () => {
          console.info(`Creating Master Media Root Directory At User Defined Path....`)
          const result = await masterMediaDir(initialConfig.mediaRootDir)
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
          const result = await videoSubDir(initialConfig.videoRootDir)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: MUSIC`)
          const result = await musicSubDir(initialConfig.musicRootDir)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: PHOTOS`)
          const result = await photosSubDir(initialConfig.photosRootDir)
          return result
        })
        .then(async () => {
          console.info(`Creating Media Sub Directory: GAMES`)
          const result = await gamesSubDir(initialConfig.gamesRootDir)
          return result
        })
        .then(async () => {
          console.info('Verifying all build steps completed successfuly...')
        })
        .then(async () => {
          console.info(`1. Video Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(initialConfig.videoRootDir)
          return result
        })
        .then(async () => {
          console.info(`2. Music Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(initialConfig.musicRootDir)
          return result
        })
        .then(async () => {
          console.info(`3. Photos Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(initialConfig.photosRootDir)
          return result
        })
        .then(async () => {
          console.info(`4. Games Sub Directory Verification...`)
          const result = await fileDirVerificationHandler(initialConfig.gamesRootDir)
          return result
        })
        .then(() => {
          console.info(`Media Sub Directory File System Verification: SUCCESS`)
          console.info(`-----------------------------------------------------`)
          console.info(`Dynamic generation of the Master Media Directory At User Defined Path, and it's sub directories COMPLETE`)
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
      console.info(`Master Media Root Directory And It's Sub Directories Already Exist At The User Defined Path.`)
      console.info(`Bypassing New File System Directory Generation To Avoid Overwritting Existing Data.`)
      return true
    }
    return finalFileSystemDirVerificationHandler(initialConfig.mediaRootDir) ? createNewMediaFileSystemDirectory() : skipCreatingNewMediaFileSystem()
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
      .then(() => generateUserDefinedMediaRootPath())
      .then(() => {
        defaultConfigObj.mediaRootDir = initialConfig.mediaRootDir
        defaultConfigObj.videoRootDir = initialConfig.videoRootDir
        defaultConfigObj.musicRootDir = initialConfig.musicRootDir
        defaultConfigObj.photosRootDir = initialConfig.photosRootDir
        defaultConfigObj.gamesRootDir = initialConfig.gamesRootDir
        return defaultConfigObj
      })
      .then(data => data)
      .catch(e => {
        console.error(e)
        return new Error(e)
      })

  return initialConfig.mediaRootDir === null ?
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
