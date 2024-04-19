export const CPFMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  isValue = isValue.replace(/^(\d{3})(\d)/g, "$1.$2");
  isValue = isValue.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  isValue = isValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  isValue = isValue.replace(
    /^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/,
    "$1.$2.$3-$4"
  );
  return isValue.substring(0, 14);
};

export const TELEFONEMask = (v: string) => {
  let isValue = v.toString();
  isValue = isValue
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");

  return isValue.substring(0, 15);
};

export const TelefoneMaskWithoutDDD = (v: string) => {
  let isValue = v.toString();
  isValue = isValue.replace(/\D/g, "").replace(/(\d{5})(\d{4})/, "$1-$2");

  return isValue.substring(0, 10);
};

export const DATEMaskStart = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  isValue = isValue.replace(/^(\d{2})(\d)/g, "$1/$2");
  isValue = isValue.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
  isValue = isValue.replace(/^(\d{2})\/(\d{2})\/(\d{4})(\d)/, "$1/$2/$3");

  return isValue;
};

export const DATEMaskStartInternational = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  isValue = isValue.replace(/^(\d{4})(\d)/g, "$1/$2");
  isValue = isValue.replace(/^(\d{4})\/(\d{2})(\d)/, "$1/$2/$3");
  isValue = isValue.replace(/^(\d{4})\/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

  return isValue;
};

export const DATEMaskEnd = (v: string) => {
  if (v.length <= 0) return v;

  const isValue = v.split("-").reverse();

  return isValue.join("/");
};

export const CEPMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");

  isValue = isValue.replace(/(\d{5})(\d{3})/, "$1-$2");

  return isValue.substring(0, 9);
};

export const CLEARMasks = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  return isValue;
}

export const MonthMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  isValue = isValue.substring(0, 2);

  return isValue;
}

export const YearMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, "");
  isValue = isValue.substring(0, 4);

  return isValue;
}

export const CARDMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, '');
  isValue = isValue.replace(/^(\d{4})(\d)/g, '$1 $2');
  isValue = isValue.replace(/^(\d{4})\ (\d{4})(\d)/, '$1 $2 $3');
  isValue = isValue.replace(/^(\d{4})\ (\d{4})\ (\d{4})(\d)/, '$1 $2 $3 $4');
  isValue = isValue.replace(/^(\d{4})\ (\d{4})\ (\d{4})\ (\d{4})(\d)/, '$1 $2 $3 $4');

  return isValue;
};

export const VALIDATIONCARDMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, '');
  isValue = isValue.replace(/^(\d{2})(\d)/g, '$1/$2');
  isValue = isValue.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2');
  isValue = isValue.replace(/^(\d{2})\/(\d{2})/, '$1/$2');

  return isValue;
};

export const CVVMask = (v: string) => {
  let isValue = v;
  isValue = isValue.replace(/\D/g, '');

  return String(isValue).substring(0, 3);
};

export const CartaoNameMask = (v: string) => {
  return v.toUpperCase();
}