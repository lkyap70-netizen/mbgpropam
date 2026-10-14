var KODE='propam2026';
var NAMA_FOLDER='LAPORAN PROPAM';
var FOLDER_ID='14NzbERuRjDaHzmUKoCEk1tEEAyJJ_2K3';
function out(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function fld(){var r=DriveApp.getFolderById(FOLDER_ID),it=r.getFoldersByName(NAMA_FOLDER);return it.hasNext()?it.next():r.createFolder(NAMA_FOLDER)}
function fnd(f,n){var it=f.getFilesByName(n);return it.hasNext()?it.next():null}
function doGet(e){try{if(String(e.parameter.k||'')!==KODE)return out({ok:0,err:'Kode rahasia salah'});var f=fld(),a=e.parameter.a;
if(a=='get'){var x=fnd(f,e.parameter.n);return out({ok:1,data:x?x.getBlob().getDataAsString():null})}
if(a=='ping')return out({ok:1,folder:f.getUrl()});
return out({ok:0,err:'aksi tidak dikenal'})}catch(err){return out({ok:0,err:String(err)})}}
function doPost(e){try{var b=JSON.parse(e.postData.contents);if(String(b.k||'')!==KODE)return out({ok:0,err:'Kode rahasia salah'});var f=fld(),x;
if(b.a=='set'){x=fnd(f,b.n);if(x){x.setContent(b.data)}else{f.createFile(b.n,b.data,'application/json')}return out({ok:1})}
if(b.a=='del'){x=fnd(f,b.n);if(x){x.setTrashed(true)}return out({ok:1})}
if(b.a=='upload'){x=f.createFile(Utilities.newBlob(Utilities.base64Decode(b.b64),b.mime,b.n));return out({ok:1,id:x.getId(),url:x.getUrl()})}
return out({ok:0,err:'aksi tidak dikenal'})}catch(err){return out({ok:0,err:String(err)})}}
