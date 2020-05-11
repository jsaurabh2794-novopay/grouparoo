const nock = require("nock");
process.env.BIGQUERY_JEST_TIMESTAMP = "1588955389276";

nock("https://www.googleapis.com:443", { encodedQueryParams: true })
  .post("/oauth2/v4/token", {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: /.+/g,
  })
  .once()
  .reply(
    200,
    [
      "1f",
      "8b",
      "08",
      "00",
      "00",
      "00",
      "00",
      "00",
      "02",
      "ff",
      "1d",
      "cf",
      "4b",
      "72",
      "82",
      "30",
      "0000d0bb642d8e8a41d29d284321f2915245360cc440533e610208b1d3bbd7e9bbc1fb011921b4efd38157b4056f40661bb4244bcc754396778f050581b882ead39e273d3e6de33e0925293fe3c20999728b78b46a8ceeb14b342bc81f77e5e34095154f9cf1726b2da5f03d934da66de65feeb924e67834caa4acb52813150a64df341b7999f66950ef2ce887fc9baab0a909be0607649d86d96de3c8aa724d784de737aeef93a89ba7b5ae6a4756e3f8bcf56c772495f3a48fcc86f8ea7aef0382826b78bd070b40e78e09daa7ec355321420bf0df4c07d9d1d7d5a099a002fcfe012b2a0fee05010000",
    ],
    [
      "Content-Type",
      "application/json; charset=UTF-8",
      "Vary",
      "Origin",
      "Vary",
      "X-Origin",
      "Vary",
      "Referer",
      "Content-Encoding",
      "gzip",
      "Date",
      "Fri, 08 May 2020 16:29:49 GMT",
      "Server",
      "scaffolding on HTTPServer2",
      "Cache-Control",
      "private",
      "X-XSS-Protection",
      "0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Content-Type-Options",
      "nosniff",
      "Alt-Svc",
      'h3-27=":443"; ma=2592000,h3-25=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
      "Connection",
      "close",
      "Transfer-Encoding",
      "chunked",
    ]
  );
nock("https://bigquery.googleapis.com:443", { encodedQueryParams: true })
  .post("/bigquery/v2/projects/sample-sources/jobs", {
    configuration: {
      query: {
        useLegacySql: false,
        query:
          "SELECT column_name, data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = @tableName",
        defaultDataset: { datasetId: "test" },
        parameterMode: "named",
        queryParameters: [
          {
            parameterType: { type: "STRING" },
            parameterValue: { value: "purchases" },
            name: "tableName",
          },
        ],
      },
    },
    jobReference: {
      projectId: "sample-sources",
      jobId: "grouparoo-job-1-1588955389276",
    },
  })
  .once()
  .reply(
    200,
    [
      "1f",
      "8b",
      "08",
      "00",
      "00",
      "00",
      "00",
      "00",
      "02",
      "ff",
      "8d",
      "54",
      "5d",
      "6f",
      "9b",
      "30",
      "14",
      "7d",
      "cf",
      "af",
      "40ecb54948c907548ad628211b52201b21edda6942c631d42d608a4dbaaaca7f9f6df2014bd5ed0dee3de7dc73afaffdd65214f509671bf54a51431c3f97a878fdf44842f542641003b1c8fcee9bb31fce4b31bc1bcd9dad0e35769fde4fc6e30a85259b82344f509b92b280885ead579db820650e0a42da5cb0dd6bf70686610e06ba615e8e861595a2245ae0ec49083c3096d3ab6ef760a31313122708e4987620498ff1eef6b29b17e4114146bbcdaa5d5e88763facfb392110304cb2f17a557928292a0294029c081727f226bc6eaa7730483b31476f3144004252664c38ab6420c9221c978514e74a6f3cc8c3d2f2f1b7165057d6c29afa0a2449996641065274a16c0003017bcd9132f7968e62bbf3a5e74c7c7be906abe957cb9974a6cbc5da7157caed57cbb31406c20449ae3256aee59fcb7fa423596d8328c399f4e48b6ccd09cfeec768bf7380470921c25d51b48705236d087a86668651388291a10fc24843616884a301d0430d9a7dd4df8408d415a4b38a0f3292a1cb30d411880210423de86b911e982842c1a80736a3be89fa4313a87bf6eed80b2c10606886694e28de4f599d7ad6c4b7027b1eb89635b366a7d65f0a7c86bef56c0ef6bdb53be5acfa982250266c5635da1c52a37bc6e7596feca3099e359017987053f2f46dd7b7bcc9d4b76f6a36f82a2e500ce0ebea592c6304128a4e6c50f0a365a870c8469ca3ea4e9c7abf72b1be1d4094237e1e7d9edae140b12eb297b37569d6f1f91e3646511d651555",
      "57be67bb5fd45a72f7becc0d48ca7774b6fbb09af3693df009d38656ebefaf5fad5a0d95dfecbd3df5fbdaf2ee0457e644c6e3bb54a00c9eaafec7a60b6295fef7bbc5d187674410f84b722c4f190ff33b07e9a9b85c5c71037135f883a0a90d8dc14190130b768e3074ed80387b4a442d94a28c1d46513d29d51c770d4b65cd8ea40938bf06eefe0c77ad5deb0ff162276a0d060000",
    ],
    [
      "ETag",
      "x49DXMwr6Y7FMv3c0tZmZA==",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Vary",
      "Origin",
      "Vary",
      "X-Origin",
      "Vary",
      "Referer",
      "Content-Encoding",
      "gzip",
      "Date",
      "Fri, 08 May 2020 16:29:50 GMT",
      "Server",
      "ESF",
      "Cache-Control",
      "private",
      "X-XSS-Protection",
      "0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Content-Type-Options",
      "nosniff",
      "Alt-Svc",
      'h3-27=":443"; ma=2592000,h3-25=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
      "Transfer-Encoding",
      "chunked",
    ]
  );
nock("https://bigquery.googleapis.com:443", { encodedQueryParams: true })
  .get(
    "/bigquery/v2/projects/sample-sources/queries/grouparoo-job-1-1588955389276"
  )
  .query({ location: "US" })
  .once()
  .reply(
    200,
    [
      "1f",
      "8b",
      "08",
      "00",
      "00",
      "00",
      "00",
      "00",
      "02",
      "ff",
      "c5",
      "54",
      "51",
      "4f",
      "c2",
      "30",
      "10",
      "7e",
      "df",
      "af20f515125087c38487a188240311c69321a46c379c6ebbd1761a30fc77db6ec05e344b24f165edddf75dbfdcb5dfbe8c5a8dbc87894f6e6b6415ae3719b0edc51ac4b3da4c816791e0724931e140ea8a0d82ae15db9c6373b45bed36ae3b60b4f3dce33cfcb0bbdd9cc5bd5788a9e47dc948c6410891cf65fca2e35a91d758426350277a186571b2d461fd048b6daae1993b1d8e076524465f23e3b9e3d83da74f0a685fff59c4a7822ef5917f93d0ebc228c4c81baea6100083c48353d729c337f0c4508f97d3388da0c131631ef0424415e6f09a61965286d890a946abd1322dab639a5756e7f2a67d6047e8511162a20ae633729417286834c54f356192b309cbc37ce0874990a07407e50149e84315873e39e6f6f55f88c3b1dbbe2e718bddc22855565695830ac20896ffa42e6fe495ca075e4dbb78256712a7316689a828fde03cd9676c5c9aa16ad3f7b6db3f972c17d20a1575dde1a83f73edd1e44771f95d9c4cd0db0ae01386d2621cb4b15acd6bcbbc6937c9c1a877a88c28944f05cb40a73d2a7f588fa190b980461c8cbdf10db49777901c050000",
    ],
    [
      "ETag",
      "5Uo0MzbzqTTGra9QBssivA==",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Vary",
      "Origin",
      "Vary",
      "X-Origin",
      "Vary",
      "Referer",
      "Content-Encoding",
      "gzip",
      "Date",
      "Fri, 08 May 2020 16:29:51 GMT",
      "Server",
      "ESF",
      "Cache-Control",
      "private",
      "X-XSS-Protection",
      "0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Content-Type-Options",
      "nosniff",
      "Alt-Svc",
      'h3-27=":443"; ma=2592000,h3-25=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
      "Transfer-Encoding",
      "chunked",
    ]
  );