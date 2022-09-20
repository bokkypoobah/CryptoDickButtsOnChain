var fs = require('fs');
const util = require('util');
// npm install --save ethers
const { ethers } = require("ethers");

const CDBOCADDRESS = "0x277a9984e8636c230C348A55314594769Cd63466";
const CDBOCABI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"URIQueryForNonExistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint8[]","name":"meta","type":"uint8[]"}],"name":"buildImageURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8[]","name":"meta","type":"uint8[]"}],"name":"buildTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"builder","outputs":[{"internalType":"contract IBuilder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"encoder","outputs":[{"internalType":"contract IAnimationEncoder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"imageURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"imageURIWrapped","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadata","outputs":[{"internalType":"contract IMetadata","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"random","outputs":[{"internalType":"contract IRandom","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"seed","type":"uint64"}],"name":"randomImageURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"seed","type":"uint64"}],"name":"randomImageURIWrapped","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"seed","type":"uint64"}],"name":"randomTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renderer","outputs":[{"internalType":"contract IPixelRenderer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_builder","type":"address"}],"name":"setBuilder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"externalUrl","type":"string"},{"internalType":"string","name":"prefix","type":"string"}],"name":"setDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_encoder","type":"address"}],"name":"setEncoder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_metadata","type":"address"}],"name":"setMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_random","type":"address"}],"name":"setRandom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_renderer","type":"address"}],"name":"setRenderer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_svgWrapper","type":"address"}],"name":"setSVGWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strings","type":"address"}],"name":"setStrings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenUriBuilder","type":"address"}],"name":"setTokenURIBuilder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strings","outputs":[{"internalType":"contract IStrings","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"svgWrapper","outputs":[{"internalType":"contract ISVGWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriBuilder","outputs":[{"internalType":"contract ITokenURIBuilder","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

const CDBOCBUILDERADDRESS = "0xDf70e9434195c90CBBe377b2648A89Dd4FbCAD05";
const CDBOCBUILDERABI = [{"inputs":[{"internalType":"uint256","name":"_size","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"}],"name":"InvalidCodeAtRange","type":"error"},{"inputs":[{"internalType":"uint256","name":"traitCount","type":"uint256"}],"name":"UnexpectedTraitCount","type":"error"},{"inputs":[],"name":"WriteError","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"canonicalSize","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCanonicalSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract IPixelRenderer","name":"renderer","type":"address"},{"internalType":"contract IAnimationEncoder","name":"encoder","type":"address"},{"internalType":"uint8[]","name":"metadata","type":"uint8[]"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getImage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"key","type":"uint256"},{"internalType":"bytes","name":"imageData","type":"bytes"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"key","type":"uint256"},{"internalType":"bytes","name":"imageData","type":"bytes"}],"name":"setDelta","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract deployment 0xed0555bf0420aab38d62065f1cafdbce032528189a7483b2b8a95201f92734b3
let TXS = [
  ["0xc8a193fab711d4fea0a845512d47c585b558a4c30cf35fc8603a21f12a6cf569", "0x60806040"],
  ["0x92de3f26733b246f6e07d51fc0099ae186e124df7690200aca43c750aebc96b6", "0x60806040"],
  ["0x790f3a2caa9eb6160ac829a02571c89d50eaaf2c374d1a9641328b6cbe79f5f2", "0x60806040"],
  ["0x861541f6b2ee30724010515a8bc38a17ff7782c04967de94302aebe0681cb433", "0x60806040"],
  ["0x8bb6b50d8fe5abdeebde8642e163c08414419414d291bbc2197b0b2c8e7f07c8", "0x60806040"],
  ["0x728e3ae2fcb4ad9cb0d4b2f3a67171130e231687ddd2f9006019ced4d580a076", "0x60806040"],
  ["0x684e0dc4ed485815d3339df1793cee9c50fccf651a9f89751f89c5742fe508d5", "0x60806040"],
  ["0xadc8470b054f16e29f28144b106b0768246b9b63dea7d4c04ae506b3ad5ddadd", "0x60806040"],
  ["0x511e9e8dc730e06678ff95dcc130add4ba09982b8b76a72f96d13b380cf01adf", "0x61016060"],
  ["0xba9e97f551103dade5c214ab75205035a8f9712b018ede703600166e90f41eb2", "Set Data"],
  ["0xe23e4c196320afae90c007377e70ac77330359e43143e49ce50b6a3da35bf739", "Set Data"],
  ["0x6fed0199744d38abdab03ed9cd445c8061ad2cd54113ec091b67332b86881250", "Set Data"],
  ["0xe14ee797c4c7c0ee4b8a7bd82c3319c90de4efdb10f42b80767b2f38ee561f80", "Set Data"],
  ["0x46e873594d0b852685204345e402f23535b9bfe81043896f11252488180e606e", "Set Data"],
  ["0xf314c16e76574721129cb2f37e9bc6beaa4da90c23659968aa332dcdb4b6bc11", "Set Data"],
  ["0x65dea4f7138cf6b5f880c2c89dfa428fa84d30e40941fd3eb641f27ac9238de8", "Set Data"],
  ["0x425b1752250c2395493c3648c3753f652d554100fee2decaa41a6cc2ca8f9bbe", "Set Data"],
  ["0xb9f7374f9eecfd03de6cc07008193483a3d84cf5b6ab796454458f88442b337b", "Set Data"],
  ["0xd6ec5ad79e9e5d5198e90a5b3aeb9430a8b5f94cd2d1c1de352ce451e8b57a69", "Set Data"],
  ["0x6ac680c43861d70dee536fe1e765b4468fe3f8574ce3b56f16d8d3215e8ee6c3", "Set Data"],
  ["0x691b807d9b89c674a42ab0797d5884cac7b7dee77a6dd1a56c619fdaeacbf2b6", "Set Data"],
  ["0x14b44c12dc2bc0408b48517accabf122030e1ee4a67f99366412814322434e28", "Set Data"],
  ["0x07683955662b4d0993153d98c5c6d2a7b3f7b357aa9ad43b9a8827250cec6bfe", "Set Data"],
  ["0xeca11f0ae0368a38e8c1bf74570db2ca18b91895545670064daaeaf73414d946", "Set Data"],
  ["0x0bab765c625b92d64b3432ce0f2f45ba4e6bcc294d2d6ec2230b71c0796078dc", "Set Data"],
  ["0x277c62ffe5c096e505f35a26ba5f1657234420224db62b4d0ee0901f5169860c", "Set Data"],
  ["0x871c6d9a4a29f00a1bdbd0f6b101f866bbe00b824aef25720fe2af5fefc810de", "Set Data"],
  ["0x9ab7ad02f7d45e659554bcad737a8b2b2f1bb7fbe794367a0ff6f4233528019b", "Set Data"],
  ["0x1d0d29bed67400362e06216a5aa85967deae6b2dfea66d0030c13b6ae04ea2e7", "Set Data"],
  ["0xfd9db43268e2b304d1c64a31bc44250c53493d19f2bbb2ff136d2ffcb0116832", "Set Data"],
  ["0x582982d339076d405ca52a238701e96cd38580218aedd58e33cc9554581197e6", "Set Data"],
  ["0x00be2bd8cf938e63effaa2f50bdb8184b58795beb4a0223a5ae4e471351fba2c", "Set Data"],
  ["0x4cdbe3add65cef5fd8061c04e03550368629527ef976ea2f5962f81eddb3cfdb", "Set Data"],
  ["0x3df00464aeb85149989b8f4c2df0e2f1f6a2634ac1ced9dbf949da39cf34b260", "Set Data"],
  ["0x6d0b7200ad54b4e23b487ae1bf73492c580eb4e2958a686c6521216fda0b3f01", "Set Data"],
  ["0x8e3a8f3af8f153af5e8fb41f3614d6c4442183af9d7ff3e720db93a0e89b30f0", "Set Data"],
  ["0xf6cd5120b07585c598ddb7fe5f625403d6676385c4027d5d29963fe1c5ed4d36", "Set Data"],
  ["0xed49fa7c9bad239abe9a0a699e87d9a912fed5b51b3b3c42549bba5a991967f4", "Set Data"],
  ["0x38d554d0b273ba49d50852e2c8c0836c827421f6c7aecd1da76ddbfe9486c744", "Set Data"],
  ["0xe833112fc90614db33eb19685bd07ce93cd67a7379245979b3f061ed81c790ca", "Set Data"],
  ["0x8fa12d0f923ca1789ffd322fc15c7e96790ec1c8ca4198229346da7b17d10df8", "Set Data"],
  ["0xf998af8459a2bba54559221ad57ce475ac60c50d9b22c7c4aa9de46a0e53a14f", "Set Data"],
  ["0xbb02c38891f4a3821f694f406f22322f4a872f6b736124b54358d52b8ad1d351", "Set Data"],
  ["0xe4943aa7acb14c0f9ee0e89d20b5fafce9b1f1438d58d1037c1623dd2eb2d7c4", "Set Data"],
  ["0x45555d176297bd2129460d5ba189457ab7f4a838ee363da0adb0b5bac37583f1", "Set Data"],
  ["0x6348356c391404671a6083974b43d64aba75c7d48992aa9126bbb9121dfef3ef", "Set Data"],
  ["0x5f2ef0d73ad46c2c2065854b088a34e2b05cb2eaeb6f946fcb23f537320a7aea", "Set Data"],
  ["0x50bf524cb3eb5ebc4cd5a6f9bd14005d8dac065a8e008d013f13bcfa76f2282a", "Set Data"],
  ["0x52056af21fade096e153c6648b3fa220bf600f1aea1f83a932c9f9ab030f0179", "Set Data"],
  ["0xbd3f900ead9c65a1b56b5ac11119a66d708df5a7d5b38846229020bc1978862f", "Set Data"],
  ["0xbf7adf85d380b00db3c7ac65e7e27f62a3f962146d2619756ecc7b115a9f6092", "Set Data"],
  ["0xd025316c67d4089574452c3785457e79c7519358da852d55826447551644b3ad", "Set Data"],
  ["0xd9094b30beab4320c14b34ff1ee6955545f9c63c68ca26a0ce4ab8fbe1bab710", "Set Data"],
  ["0x2cf79ae3eb31bafd409db535fd7f6a8d1a848b0214f70e62c7aaa8db4128e623", "Set Data"],
  ["0x4dbceab436df6c457f19c6013c878c5d5e2c4e987c748e586c65edc783bbf049", "Set Data"],
  ["0xf39e3d669c238a7aa1b001d7f1a6e0878d22c531389cfec91ac37ec832c078ce", "Set Data"],
  ["0xdde3b1f15ccdcc7cc3591435d0752efc04d9dc61fd0604b81e4a4be0a354e417", "Set Data"],
  ["0x01bc97eaf52cebf52fc0f10b7e85545687e6a8c42ebcad5d85c3a53da4c2099d", "Set Data"],
  ["0x9e7a238811a65aef76b707334042680c018124491e8b9c2d900af07f0628617d", "Set Data"],
  ["0xab9f3b15a5364623ced7c4ed63469fa074bb029b4a994c49cbd369cbfd00a874", "Set Data"],
  ["0x5327f8c9c6f1ea52fe7769a93ee2de2292622e92cb8dcd0130046a477764e3c6", "Set Data"],
  ["0x985fe83a7aa8718955d5927b024a6fa28bc9f7eecb9c85b1dc76531c2494b93b", "Set Data"],
  ["0x14509494a2ac4e25b0f257ed787dd54b215533e330a994283821761b028daf42", "Set Data"],
  ["0x8ad75426acc3282d789dedb4cf5e23a836c0683417daab704e9c19e19c52d3d3", "Set Data"],
  ["0x9dc293a2182ce0b8ed6d33b94fdd3a0011cf2376db16298290c298864f1b18c9", "Set Data"],
  ["0x542d145e3546753e31580054cadbada163a1b5c9089dc15df809868ba85bf791", "Set Data"],
  ["0x256cc9d5b2c4de773e7283768270651b099a3e30a4a7bbf8ba811b1be055dd59", "Set Data"],
  ["0x23b7b9b66e4b49fe8760b52d2bf101a95460d10cfb5517a4f99a8c9256e6e83d", "Set Data"],
  ["0x39aa5ed095a15b95277ba6c1eb3be8bde39fb2f87e1b1abf00f3b30ff48c4670", "Set Data"],
  ["0xd49fd9e032609e6fe2a069859d8794306c9684d25b5e07617eed5c76aa94018e", "Set Data"],
  ["0x323312e73a34367d89261925f2b40b7bc17ea0d92f773987499c8e0ec4e92197", "Set Data"],
  ["0x40c60cd654e6964dab413abeff5072856caf1c94a5c3c308de623c1704fc8536", "Set Data"],
  ["0x46a7c5c4de186a0fab23e13bc2a892cb2ba3dd1efce410f37ba284760330b87e", "Set Data"],
  ["0x9cb742b08bd3ac3159f0fe1dcdf10d209359a87716590b4698f0612e0caa79c7", "Set Data"],
  ["0xc92bafbd03b0e360501b5b8cd72957f55e24b4df190dc165e40da6a6021f1aa8", "Set Data"],
  ["0xa8027fff698f61347148c1f842a1df8a1595595dbe0213f4a435512d5e66e78d", "Set Data"],
  ["0x237df0e7db1992e195867768d74bc86f08df6f1a416066ead8bf5371314a917d", "Set Data"],
  ["0x65ddd4f441e04294a288a05a2547286eef746a17e247549a04d0983b714f9342", "Set Data"],
  ["0xa5aacbda45c2606485a6335f6f7c6a97d150be91edecfcc1e1c5e62a453bee37", "Set Data"],
  ["0x201c4278fbdedb27dc94f2d1e394bf99494ea5d8a6c48cd491a4ee7478635890", "Set Data"],
  ["0x7b9ec1be0c4e26dcf4b1e6d46b37875b26e19c1d617a290b333bd360157669ee", "Set Data"],
  ["0xe5b3656b6d29ddffff869cdb8d6e7508cbc9998c47d575a21c8a87a3c215f8ff", "Set Data"],
  ["0x274eee252986a2a3303c31f89972388979e532b4442a5d45812877b7698520e6", "Set Data"],
  ["0x434035c1e5387dbf4160f659b347c8426b5511655125960d66e5749e16cd7e63", "Set Data"],
  ["0xe7ad6c3d251cb150eddfa4c47a825fe430b47e0ffdaffb75d2e9a06f79f52bb1", "Set Data"],
  ["0x897364e2be2d9e3a331d7ef5bfaca1ea2ab41cb5d14f2709effd7a45492a5840", "Set Data"],
  ["0xdcbc3a9636c70ede9612aabf2e77ac463bbc9aa6067ade7856d25fbbdbd49ffd", "Set Data"],
  ["0xc9078dc7c6d6092999cc545e5fbe6990b508141b0c55385585be8cf9e96672d4", "Set Data"],
  ["0x3954f545c1f906a6ead15ac15b2f1fa52e3aa54a6c2580dd311d91f421eaf937", "Set Data"],
  ["0x08eac4bf0f374b386b4d8dc37b95b32aab37c5667f74f8cfe7d6a670826da9b0", "Set Data"],
  ["0xddbfedb6149c7482d20b494c2197fa54630ddb4fb627adc4f561416240d94bd6", "Set Data"],
  ["0x235b3fc8e9688b29f00cbc9259dc46e0bc5187f36bec406c33e89f381404229b", "Set Data"],
  ["0xd898867d139f90e24a6275f744fdb69399cb636b7013d4ca6caaa5a28af51ad9", "Set Data"],
  ["0xb57cb93a124a0d7b393565ed330ac6494e5313d6f74b465b599134b21feff9f5", "Set Data"],
  ["0x26fcd380b62f30fa1ebb99fc606713df5be8a1c60eb5151d9865fc8e87988188", "Set Data"],
  ["0xc1c96fa229c11cd1cfa49477b5fbae4ee131174f1be957dd190efdac7076bb5f", "Set Data"],
  ["0xf387084897758a1dd5b45eeb525f23491f5056e0464197e2244b7dcd5d0fc72c", "Set Data"],
  ["0xca1b1d2e523b761c87977613e95129bc3b48162fc288d5a1eb004673e365a3c4", "Set Data"],
  ["0x85a2827d0d7a88449af33f0f33462137c279846192df6db17a0ed749c72c1e8d", "Set Data"],
  ["0x05ef051b7a06f21ae7028140867c8d48b6790413c84d78c4e3f0548c742c2c39", "Set Data"],
  ["0x0dc77cecdb8140ba0e6daf57e7efbeb6b2c12fcf26fbb1e943f3167d579be4ee", "Set Data"],
  ["0x322c55a46a768e3dfe56b6c110350d8c2e3eb38a595cdf4bbd5ac00aa679d454", "Set Data"],
  ["0x738768d9c79bdad2c3174b8366656550a7badc567e3d714882fc2e364d187086", "Set Data"],
  ["0x1cd9ecc123a09fd004b9e9c22f564ee1dcb379bc14d7ac8f52a093ce55c29451", "Set Data"],
  ["0xc98e355411e47ca77bcf6e5d99ce93cf3ed749e2461fe53076d4dc43d673b628", "Set Data"],
  ["0xbae9606ddf49c489569b7e93eda83d9304c788274f9f0b3d556fe284c6aa145b", "Set Data"],
  ["0xc056000c3cc4dcd11890b839d52b6642930c7fa74c82e2be92617235f7c82b0b", "Set Data"],
  ["0x8e33aca4913180dbe9d71ebaaa77a5102f1c43a14e28ab24b2e5de9dd93cf66e", "Set Data"],
  ["0x606eeeca64f32514cda4da18124fb0704ddccb871c427baa622ba9aa51eaa60b", "Set Data"],
  ["0x292a2bfcf2b775d9cd1bc737ce5e813e090890c4ca16e541ce5ef76cd60e232b", "Set Data"],
  ["0x265286119650eb10690f9358ce59cf3ed613b4e0a52c0d9ac35483a0e995a607", "Set Data"],
  ["0x14727aad23cbd1c05dad60d8c5aaf553d74606be611d3d8fc235a09c44ee3ea1", "Set Data"],
  ["0x99ee5f194a7fdfd6b4cccc0fd14954ad8eacbbef88c25a0502a4d37f4bdec980", "Set Data"],
  ["0x1b5df852ea13ebf1321df6289efb15b031d56c2a8a9e08522a02623e006b785a", "Set Data"],
  ["0xa63f2b4b6eeb399ee86a7bab58ad5aa90d5affb417e1217cc8a13483164b6df0", "Set Data"],
  ["0xcf244813dff31f34ed3c3f6bf766bfdc665361b0a0edd350e3c9d26437e28b6f", "Set Data"],
  ["0xcabc4eaf557dcaf3e9424fcd2c55c9a940709cc5307b6a96e10d7c47dc29d0d2", "Set Data"],
  ["0xfb581f9501c08e97a39bcd053fc2d24779b1ae14b0606a3b8f09cb0afa47ee3d", "Set Data"],
  ["0xe803abd71a752d2c706c5417471256e698d42b19f36094c0d8c05c5d6d8a1580", "Set Data"],
  ["0x1afe69e29d4cd6b65018881f1ea020269f27aac7ca7102ed71a5bea397fb8991", "Set Data"],
  ["0x465534447ab38d465ddb2b1bb0af1937d3417e4ac296361de4e3e1a9544b02b1", "Set Data"],
  ["0xd4e90f0387a2b57c3058f0117f66d450a1a9009d62a2a29b1d857d244d179643", "Set Data"],
  ["0x558293b1184bd8c11459158aa6b4affd2aff5e95294267852854e6803bb27849", "Set Data"],
  ["0xa94a4655b60a0cf89ba0fe14154312aaf1f652cf63087c40a8ce8f1da191a590", "Set Data"],
  ["0x7998d4d68063b4f1db5de4aec25d5c6e7faec236b16896c279707ca90368aaf2", "Set Data"],
  ["0xd755f92219df1b634f8165771050d48002d0deb528e929418b1cf32659d61a1d", "Set Data"],
  ["0xcd5c4c06cfed50074897f874dad268d60b5b72107f05fb057bbd63f562c07fa7", "Set Data"],
  ["0x6086ea40d63ec46b1ad4dcd7f062b2397f84ae017203295f70c7c30bc364f5b0", "Set Data"],
  ["0x9d1202eb45d896a3d8a2181bad0960200739fce29e40a236e3b03731aa4ba8b0", "Set Data"],
  ["0x1dd7c3fb98022f159a457589082c410c7fa8c05e9271d940020db9e9c4edc62b", "Set Data"],
  ["0xfcef0fb69094763902a6cd73a26fec6af8ac226cc811b4d627352395c5890006", "Set Data"],
  ["0x32618b136fce3863b6ca85ac6aa42ba3f72383806912fe0d16e06a5449085c49", "Set Data"],
  ["0x06b9be44d4dd0f8852894397a8b37c3604a306dbdc1b626d54f3143e7e508b84", "Set Data"],
  ["0x09214f5ffb56a7328e21496f0501b0a6a149318db1c5ea83a6163d74148e2b23", "Set Data"],
  ["0x1ef2a4d0a8c9e184a208ab630370643f0406f954faac45ae1e5c14d1a2d1bee9", "Set Data"],
  ["0x90616b585f54b447be201756b2ad1672f425a952fb629ea499bd49499f8789bb", "Set Data"],
  ["0xedab2eb6a628dfccdb947212325d04eb52d6f5f03d671d10af4ba66d706c538b", "Set Data"],
  ["0x9d001b4613c503d499605a63d2115d9601bbe2da6e8af6f994f32bb4bdddd003", "Set Data"],
  ["0xe75751865f6e14fd7defebc3bc584aca2a7db44d07deb3c77db7dd79dd3c0746", "Set Data"],
  ["0x0f8a0e0af2e789c82506973cf2c9bf37332e62fa008e17ba9070593c2fa4e577", "Set Data"],
  ["0x6aad28d906f84361eceed4050118fa99d6ef5352f4bb3680ccd370e28be393d4", "Set Data"],
  ["0xd3c7fd5babe6b38db5b43e936714937520d1f115cc52c66f829dbccba8584e16", "Set Data"],
  ["0x6273ac7acf29bc563f6875b5025388eec376668dec3a21c6852241aa7f0e9d27", "Set Data"],
  ["0xdcbe30be1e40e1d974bec334c79cbf0c75bb5ca7794b25884fb4b26f193b40e2", "Set Data"],
  ["0x20ad1176d29a37642a57e4b008994fe347ccb7b7e3a5d22c603838cb91d513cc", "Set Data"],
  ["0xf47b77e809a180b728b88c071d0415c9f61f696a86abb861cc6779407307f8c1", "Set Data"],
  ["0xb94811081f458b2c9c03093ff06e333fe0b40bf4b866dec53d5bc1e951f281a7", "Set Data"],
  ["0x8d1c278c573b26769fac6f5b9028d4a42d42932d9ffbfd0fd259a704fe789cd7", "Set Data"],
  ["0xa746d8f897fcb92f014da843ad0a0f8dbb49ed119300b288c3b149e7515f75f6", "Set Data"],
  ["0xb54896b672b54e837142ee55c2304afe7d583033bf7c2e1bee92116d592a1b5e", "Set Data"],
  ["0x1abeefe0ee4436fe85c3d93657df6ba4b8e8c875032df8c236dac98e18997940", "Set Data"],
  ["0x82a1af6ee3e4b63de5a0cf48fbfa77041c509c5414fba606fed94cab985bc358", "Set Data"],
  ["0x9143e9e9ddffee0531338a7aec8b9a93df3fbae2a38652b83a63554d1c6d6a82", "Set Data"],
  ["0x3c523feb46ab4cfb585991aedf2e1533e75f4eab6238989cf351a697fa5449cd", "Set Data"],
  ["0xba8a5bc34b235e27f5cd2b1303a5b941eb6e5526c62af15a99fb213668313e45", "Set Data"],
  ["0xb70442d43961f441c27e5abef5d995e39776c557b09631590f3f7438bebff3fa", "Set Data"],
  ["0x260e998b183e8454f6af02dbd72950e34cf11ca3c4e2f2109fae64e1e00a07bd", "Set Data"],
  ["0x9e807055d960a4263c48c14871aa80d8261fe39c48b8ee94ac3c2f2390589014", "Set Data"],
  ["0xebf0a636831ee188f6f42f291458c8044bf931a9d7c0ee123bde60b4d831fd80", "Set Data"],
  ["0x118ae39e2c7d88920d2c267f4cb31113a270567356f8395c26bf18ceb5d5b401", "Set Data"],
  ["0xcdfb398d689fc9fcbdf0209c4c7193961417c76f93ff7b5e16a76aa2ff780a68", "Set Data"],
  ["0x63e96e5eca881891df72607146f5a2b4ce61c08a5c28e45910c9755022d82967", "Set Data"],
  ["0x162e087bee78b20afaa45a42146c88a3296f89a574c404c0ad78ff56dc888aa6", "Set Data"],
  ["0x396970da855fcff0e468cb9f6809b2ac076a70e306310b89179aa1476dadd8e6", "Set Data"],
  ["0x03d09cf3277441da5ab9f3e4e5372c3dc3001678fb15f23055fbaf67cdf6e75b", "Set Data"],
  ["0x301c01013314dca06e83b47215ec36e47a47a1112cf6ee6316cdcf0dcc4af119", "Set Data"],
  ["0x41a087859f42bb6edc3abf4b1a211ff451a689364d898ce1253aaa840fcaf3aa", "Set Data"],
  ["0x7cf3cd3250c3ded7738cda8c535a6e4f4874875765151a2a6f8ffa15ff2c0bf6", "Set Data"],
  ["0xe07b06382dc8365c007383c86883d8eb2efa867858245a6ee40f3fcf369acc8d", "Set Data"],
  ["0x2dda47dd796908491fcaa986726c2e6a7b57ff73bd95335e9394d4636a33f4ae", "Set Data"],
  ["0x9d1b22175bcfc239c2a63f735d3e970fcedf0d8972886dd0aa8ee334ee6fa951", "Set Data"],
  ["0xe6137e6048b7e2871d03f2dd3cd421a86a7c202e7241e2ae7460f368fbd1d747", "Set Data"],
  ["0xdf4daf30e10ff4952c6cc70adda7165b59ed9d8ae5b6a6908ea945b2dbeab8da", "Set Data"],
  ["0xc22889f18fa47893fa97dc18ba9629a199db673f763c5dc323471581315fad59", "Set Data"],
  ["0xef870f30020d932bf19cd3f768742eb268209a0eab645323e5fa8a2bf408261d", "Set Data"],
  ["0xc18f833421973f8355a4ec107a0d8f7eddd2219817d81d66616e14b885e539fc", "Set Data"],
  ["0x1d79a584985fdbe527becd7288c6f8db1e0b24568a93e0420db7b5df45b487e8", "Set Data"],
  ["0x7a88192af27ef5a2cfe434461702f303ddf4c199a265f524f3f394d1b76c19ea", "Set Data"],
  ["0x8e7778cf2c65bef6aec88428f34237907de767988702c68f5354d420b1a6a9b1", "Set Data"],
  ["0x3d2d6b6ee3e6b4175949c780ca5f3dbedd32b1d96ab6e6ecbd65bd1417562e0b", "Set Data"],
  ["0x29a8c9025e1df17cba71add0ccba2ee3c2112d020986c67cbaa4fa4e9cca5bfc", "Set Data"],
  ["0xfa7cdded0c2d9122fc6c1bc9d7314d49fc46f87e9a93090c95d24a394dda77c6", "Set Data"],
  ["0xe31d064fe260ca56cad966f6827e881a2f6a57b6b0f92b76d8bddf3e7a17a49d", "Set Data"],
  ["0x21ec4de37e17975cc57c2ad2f6599718342b46eafae1d02ca0fb9df46b7e6ccf", "Set Data"],
  ["0x607f312733022bb39d287037bc960f0646964ed0d8b8e32250af1b76476d4825", "Set Data"],
  ["0x09b006ed9874085237401699d928b7ee64e5c3776ac511b9854b1b23a98d451e", "Set Data"],
  ["0x98c2bd9a194caa76eaa0ea8c8726733742d27255af38c36a44886744d1b27c42", "Set Data"],
  ["0x79cfcdfaa88c255c1394a2256fb508f18879b20a2baf848300d497f2e85ba8f2", "Set Data"],
  ["0x8fc0e1dfab0d56e525ca4ab4e0365da6373befcb7b7a1512bfe9ad36d1b2ea16", "Set Data"],
  ["0xbcb357776552413681d15646ebfdf7b819c6310e77e56583cab32d77148f1020", "Set Data"],
  ["0x2806f0c96148c86ae881deaa4e2539292836a0d00b9d0979b19bb93ccd271797", "Set Data"],
  ["0xb0bf19f3fb691ec7976ca891bdac505ede6e3e4099b8326bac07b2eb4cf341ee", "Set Data"],
  ["0x46ce307af7a6668e0e41cfad47be3a99575316c6152350cc26d789d430449c7a", "Set Data"],
  ["0xbb13b36d52e1b71785b56fe9bf6a6bd1002dbc15a95883a5beb896ee62ab7e81", "Set Data"],
  ["0x3a7cf5cfa10472cde7051ba40d3551cbeace80587c3874af966706a4681bdd61", "Set Data"],
  ["0x7fe3088a072352b0b822bfca855f27c389cb83fad5ded0059e809af71b70accb", "Set Data"],
  ["0xa5378cfd8423dfdeb08fef12910c4862bc13dedc46478f7c8a7548eec3de0767", "Set Data"],
  ["0x0502f166f98e884252dae84721f18baf217f8d3386f66634d169ccc35dbb0d7c", "Set Data"],
  ["0xcfcbe9b4e042908d433faef1d8cefe549eb757dd6ed047e0e8eb0b1d31e7e0b3", "Set Data"],
  ["0x49c3b554aa46daf6487887b26ef5e620d5a6b69fa475edf7a5241f5d8eb8149f", "Set Data"],
  ["0x5a7eea061ff88dcb72444bb5f659072d8ba402343a32a5103e321b2d54998f62", "Set Data"],
  ["0x69939b566bda41eba0c6285413b20661f150ad297a14b8e63ffb1bc7c4dafab8", "Set Data"],
  ["0x15a0587cb0cf3614573fd5c87e36430d15fad7d07378018568af5f352b91e400", "Set Data"],
  ["0x9a9662d26e0ef11af0c92b62a00625cc6ff8e4ceee8cfa580884f31c18dbe3b9", "Set Data"],
  ["0xaab78e808abcecee4d0f68138c3ffaca4682b00edb0a79f691ed0c3ff9ca7b35", "Set Encoder"],
  ["0x4e4df22e297846c5cdc016e3202c4c6a0b8c6be6a5e6a2307ebfc40ae958bad5", "Set Renderer"],
  ["0x90b239cd95e331e483835504f281e7911b27bd32401cc062d1508be1aa36912e", "Set SVG Wrapper"],
  ["0x86c03bede7dbb69d9b99976f84702ba98d222e6ae00f0ef03e1edb84f1e78a06", "Set Token URI Builder"],
  ["0x5ad306e8d28e383a7377abaf2b5d07b848c59a1fcc392e00133747f8c4360875", "Set Metadata"],
  ["0x219c38bea673605ab4724cadf01199f7801090a818f3137a68032fc16fcaf8ae", "Set Builder"],
  ["0xae5d76e0b490d3075f0d6492a302141e9bc8d27a4bf58765dfb59d615fad66bd", "Set Strings"],
  ["0xc6796682ac4f156831c0c00f7fc6c691a5d80edad7d6b0e243f1372c6fe7a71f", "Set Random"],
];
// DEBUG
// TXS = [
//   "0x48cd7e8fc4e773766e0efab4a274a814239444a325e6c08ec33197b3bdf7eb57", // #8
// ];

const LAYERNAMES = ["Legendaries", "Mouth", "Eyewear", "Nose", "Headwear", "Eyes", "Clothing", "Lips", "Body", "Skill", "Background"];


async function doIt() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  const cdboc = new ethers.Contract(CDBOCADDRESS, CDBOCABI, provider);
  const cdbocBuilder = new ethers.Contract(CDBOCBUILDERADDRESS, CDBOCBUILDERABI, provider);

  console.log("Hello");
  const data = [];
  for (const item of TXS) {
    const txHash = item[0];
    const txType = item[1];
    if (txType == "Set Data") {
      const tx = await provider.getTransaction(txHash);
      console.log(txHash + " " + tx.data.substring(0, 100));
      let decodedData = cdbocBuilder.interface.parseTransaction({ data: tx.data, value: tx.value });
      const key = decodedData.args[0].toString();
      const imageData = decodedData.args[1];
      data.push({ key, imageData });
    }
  }

  let filename = "setupData.json";
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) return console.error(err);
    // console.log("File successfully written !");
  });
}

doIt();

// console.log(process.cwd());
