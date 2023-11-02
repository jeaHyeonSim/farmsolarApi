/*
 * 도로명주소 API 리턴값 형태
    roadAddr	String	Y		전체 도로명주소
    roadAddrPart1	String	Y		도로명주소(참고항목 제외)
    roadAddrPart2	String	N		도로명주소 참고항목
    jibunAddr	String	Y		지번 정보
    engAddr	String	Y		도로명주소(영문)
    zipNo	String	Y		우편번호
    admCd	String	Y		행정구역코드
    rnMgtSn	String	Y		도로명코드
    bdMgtSn	String	Y		건물관리번호
    detBdNmList	String	N		상세건물명
    bdNm	String	N		건물명
    bdKdcd	String	Y		공동주택여부 (1:공동주택, 0: 비공동주택)
    siNm	String	Y		시도명
    sggNm	String	N		시군구명
    emdNm	String	Y		읍면동명
    liNm	String	N		법정리명
    Rn	String	Y		도로명
    udrtYn	String	Y		지하여부 (0:지상, 1:지하)
    buldMnnm	Number	Y		건물본번
    buldSlno	Number	Y		건물부번 (부번이 없는 경우 0)

    mtYn	String	Y		산여부 (0:대지, 1:산)
    lnbrMnnm	Number	Y		지번본번(번지)
    lnbrSlno	Number	Y		지번부번(호) (부번이 없는 경우 0)
    emdNo	String	Y		읍면동일련번호
    hstryYn	String	Y		"* 2020년12월8일 추가된 항목 변동이력여부(0: 현행 주소정보, 1: 요청변수의 keyword(검색어)가 변동된
    주소정보에서 검색된 정보)"
    relJibun	String	Y		"* 2020년12월8일 추가된 항목 관련지번"
    hemdNm	String	Y		"* 2020년12월8일 추가된 항목 관할주민센터
    ※ 참고정보이며, 실제와 다를 수 있습니다."


*/