// Config file for mediasoup elements

const os = require('os');

const announcedIp='vrc.jp';
//const announcedIp='localhost';

module.exports = Object.freeze({
  numWorkers: Object.keys(os.cpus()).length,
  worker: {
    logLevel: 'debug',
    logTags: [
      'rtp',
      'srtp',
      'rtcp',
    ],
    rtcMinPort: 40000,
    rtcMaxPort: 49999
  },
  router: {
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2
      },
      {
        kind                 : 'audio',
        mimeType             : 'audio/PCMU',
        preferredPayloadType : 0,
        clockRate            : 8000,
        rtcpFeedback         :
        [
          { type: 'transport-cc' }
        ]
      },
      {
        kind                 : 'audio',
        mimeType             : 'audio/PCMA',
        preferredPayloadType : 8,
        clockRate            : 8000,
        rtcpFeedback         :
        [
          { type: 'transport-cc' }
        ]
      },
      /*
      {
        kind: 'audio',
        mimeType: 'audio/aac',
        clockRate: 48000,
        channels: 2
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000
        }
      },
      {
        kind: 'video',
        mimeType: 'video/VP9',
        clockRate: 90000,
        parameters: {
          'profile-id': 2,
          'x-google-start-bitrate': 1000
        }
      },*/
      {
        kind: 'video',
        mimeType: 'video/H264',
        clockRate: 90000,
        parameters: {
          'packetization-mode': 1,
          'profile-level-id': '42e01f',
          'level-asymmetry-allowed': 1,
          'x-google-start-bitrate': 1000
        }
      },
    ]
  },
  webRtcTransport: {
    listenIps: [ { ip: '0.0.0.0', announcedIp} ], // TODO: Change announcedIp to your external IP or domain name
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    maxIncomingBitrate: 1500000
  },
  plainTransport: {
    listenIp: { ip: '0.0.0.0', announcedIp}, // TODO: Change announcedIp to your external IP or domain name
    rtcpMux: true,
    comedia: false
  }
});
